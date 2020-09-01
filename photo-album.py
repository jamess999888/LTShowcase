import requests
import sys

if (len(sys.argv) == 2):
    ploads = {'album':sys.argv[1]}
    r = requests.get('http://localhost:49160/',params=ploads)
    print(r.text)
else:
    print("Usage: a single int argument must be supplied")