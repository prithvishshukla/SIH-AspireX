# tests/test_prototype.py — Minimal tests for prototype JSON I/O and seeds
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'


def load_json(p: Path):
    return json.loads(p.read_text(encoding='utf-8'))


def test_seed_users_exist_and_roles_unique():
    users = load_json(DATA / 'users.json')
    assert len(users) == 3
    roles = sorted(u['role'] for u in users)
    assert roles == ['admin', 'patient', 'practitioner']
    names = sorted(u['name'] for u in users)
    assert names == ['Aditya', 'Kislaya', 'Shivani']


def test_json_files_present():
    for fname in ['appointments.json', 'admin_actions.json', 'audit_log.json', 'backups.json']:
        p = DATA / fname
        assert p.exists()
        data = load_json(p)
        assert isinstance(data, list)


def test_safe_write_and_read_roundtrip(tmp_path: Path):
    sys.path.append(str(ROOT / 'cgi-bin'))
    from safe_io import safe_write, safe_read  # type: ignore

    path = tmp_path / 'round.json'
    payload = [{"a": 1}, {"b": 2}]
    safe_write(str(path), payload)
    out = safe_read(str(path), [])
    assert out == payload


def test_permission_simulation():
    users = load_json(DATA / 'users.json')
    u = {x['role']: x for x in users}
    # Dummy appointment
    appt = {
        'appointment_id': 'a_demo',
        'patient_id': u['patient']['user_id'],
        'practitioner_id': u['practitioner']['user_id'],
        'status': 'pending'
    }

    def can_cancel(user, a):
        if user['role'] == 'admin':
            return True
        if user['role'] == 'patient' and a['patient_id'] == user['user_id']:
            return True
        return False

    def can_escalate(user, a):
        if user['role'] in ('admin', 'practitioner'):
            return True
        return False

    assert can_cancel(u['admin'], appt) is True
    assert can_cancel(u['patient'], appt) is True
    assert can_cancel(u['practitioner'], appt) is False
    assert can_escalate(u['admin'], appt) is True
    assert can_escalate(u['practitioner'], appt) is True
    assert can_escalate(u['patient'], appt) is False
