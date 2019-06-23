import os
import json


def mkdir(path):
    if not os.path.exists(path):
        os.mkdir(path)


def exportJson(path, school, data):

    fp = open(path + '/%s.json' % school, "w+", encoding="utf-8")
    j = json.dumps(data, indent=4, sort_keys=True, ensure_ascii=False)
    fp.write(j)
