import sys
import http.client as httplib

def check_health():
    try:
        conn = httplib.HTTPConnection("localhost", 5000)
        conn.request("HEAD", "/api/health")
        res = conn.getresponse()
        if res.status == 200:
            sys.exit(0)
        else:
            sys.exit(1)
    except Exception as e:
        sys.exit(1)

if __name__ == "__main__":
    check_health()