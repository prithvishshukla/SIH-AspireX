# cgi-bin/api.py — Minimal CGI JSON API for prototype (no auth, DEV-ONLY)
from __future__ import annotations

import cgi
import cgitb
import sys
import json
import os
from datetime import datetime, timezone, timedelta
from typing import Any, Dict

from safe_io import safe_read, safe_write

cgitb.enable()  # show tracebacks in browser for demo

ROOT = os.path.dirname(os.path.dirname(__file__))
DATA = os.path.join(ROOT, 'data')

USERS_PATH = os.path.join(DATA, 'users.json')
APPTS_PATH = os.path.join(DATA, 'appointments.json')
ADMIN_PATH = os.path.join(DATA, 'admin_actions.json')
AUDIT_PATH = os.path.join(DATA, 'audit_log.json')

IST = timezone(timedelta(hours=5, minutes=30))


def now_ist() -> str:
    return datetime.now(IST).isoformat()


def respond(obj: Any, status: int = 200) -> None:
    print(f"Status: {status}")
    print("Content-Type: application/json; charset=utf-8\n")
    print(json.dumps(obj, ensure_ascii=False))


def get_body() -> Dict[str, Any]:
    if os.environ.get('REQUEST_METHOD', 'GET').upper() == 'POST':
        try:
            length = int(os.environ.get('CONTENT_LENGTH', '0'))
        except ValueError:
            length = 0
        data = sys.stdin.read(length) if length > 0 else ''
        try:
            return json.loads(data) if data else {}
        except Exception:
            return {}
    form = cgi.FieldStorage()
    return {k: form.getvalue(k) for k in form.keys()}


def append_log(path: str, entry: Dict[str, Any]) -> None:
    log = safe_read(path, [])
    log.append(entry)
    safe_write(path, log)


def handle():
    # Simple router via ?action=
    form = cgi.FieldStorage()
    action = form.getfirst('action', '')

    if action == 'users':
        users = safe_read(USERS_PATH, [])
        return respond(users)

    if action == 'list_appointments':
        appts = safe_read(APPTS_PATH, [])
        return respond(appts)

    if action == 'create_appointment':
        # expected fields: appointment_id, patient_id, practitioner_id, scheduled_at
        body = get_body()
        appts = safe_read(APPTS_PATH, [])
        item = {
            "appointment_id": body.get("appointment_id"),
            "patient_id": body.get("patient_id"),
            "practitioner_id": body.get("practitioner_id"),
            "scheduled_at": body.get("scheduled_at"),
            "status": "pending",
            "created_by": body.get("created_by"),
            "cancelled_by": None,
            "cancellation_reason": None,
            "escalated_to": None,
            "escalation_reason": None,
            "is_deleted": False,
            "created_at": now_ist(),
            "updated_at": now_ist(),
        }
        appts.append(item)
        safe_write(APPTS_PATH, appts)
        append_log(AUDIT_PATH, {"ts": now_ist(), "event": "create_appointment", "data": item})
        return respond({"ok": True, "appointment": item})

    if action == 'cancel_appointment':
        body = get_body()
        appts = safe_read(APPTS_PATH, [])
        found = None
        for a in appts:
            if a.get('appointment_id') == body.get('appointment_id'):
                a['status'] = 'cancelled'
                a['cancelled_by'] = body.get('by')
                a['cancellation_reason'] = body.get('reason')
                a['updated_at'] = now_ist()
                found = a
                break
        if found is None:
            return respond({"ok": False, "error": "not_found"}, 404)
        safe_write(APPTS_PATH, appts)
        append_log(AUDIT_PATH, {"ts": now_ist(), "event": "cancel_appointment", "data": found})
        return respond({"ok": True, "appointment": found})

    if action == 'escalate_appointment':
        body = get_body()
        appts = safe_read(APPTS_PATH, [])
        found = None
        for a in appts:
            if a.get('appointment_id') == body.get('appointment_id'):
                a['escalated_to'] = body.get('escalated_to')
                a['escalation_reason'] = body.get('reason')
                a['updated_at'] = now_ist()
                found = a
                break
        if found is None:
            return respond({"ok": False, "error": "not_found"}, 404)
        safe_write(APPTS_PATH, appts)
        append_log(AUDIT_PATH, {"ts": now_ist(), "event": "escalate_appointment", "data": found})
        return respond({"ok": True, "appointment": found})

    if action == 'admin_action':
        body = get_body()
        entry = {
            "ts": now_ist(),
            "actor": body.get('actor'),
            "action": body.get('action'),
            "target": body.get('target'),
            "meta": body.get('meta', {}),
        }
        log = safe_read(ADMIN_PATH, [])
        log.append(entry)
        safe_write(ADMIN_PATH, log)
        append_log(AUDIT_PATH, {"ts": now_ist(), "event": "admin_action", "data": entry})
        return respond({"ok": True})

    return respond({"ok": False, "error": "unknown_action"}, 400)


if __name__ == '__main__':  # allow running under CGI
    handle()
