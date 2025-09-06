# cgi-bin/safe_io.py — Atomic JSON read/write helpers for prototype demo
from __future__ import annotations

import json
import os
import tempfile
from typing import Any


def safe_read(path: str, default: Any) -> Any:
    """Read JSON safely; return default on error."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return default


def safe_write(path: str, data: Any) -> None:
    """Atomic JSON write: write to temp, fsync, replace."""
    dirpath = os.path.dirname(os.path.abspath(path))
    os.makedirs(dirpath, exist_ok=True)
    fd, tmppath = tempfile.mkstemp(prefix='.tmp_', dir=dirpath)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as tmp:
            json.dump(data, tmp, ensure_ascii=False, indent=2)
            tmp.flush()
            os.fsync(tmp.fileno())
        # On Windows, os.replace works as atomic best-effort
        os.replace(tmppath, path)
        # fsync directory for durability (best-effort; may fail on Windows)
        try:
            dirfd = os.open(dirpath, os.O_DIRECTORY)
            try:
                os.fsync(dirfd)
            finally:
                os.close(dirfd)
        except Exception:
            pass
    finally:
        if os.path.exists(tmppath):
            try:
                os.remove(tmppath)
            except Exception:
                pass
