import requests
import sys

ploads = {'album':sys.argv[1]}
r = requests.get('http://localhost:49160/',params=ploads)
print(r.text)