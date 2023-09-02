import json
from sys import argv
from urllib.parse import quote
import re


def is_folder(x):
    try:
        return x["children"]
    except KeyError:
        return False


# will check in the first folder named tools
# also make new bookmark if cybertanks hacks bookmark is not found
FILENAME = argv[1]
CODE = argv[2]
code = ""
with open(CODE, "r", encoding="utf-8") as c:
    code = c.read()
with open(FILENAME, "r+", encoding="utf-8") as f:
    file = json.load(f)
    bookmarks = file["roots"]["bookmark_bar"]["children"]
    for i, a in enumerate(bookmarks):
        if is_folder(a) and "tools" in a["name"]:
            for j, b in enumerate(a["children"]):
                if "cybertanks" in b["name"] and "hacks" in b["name"]:
                    file["roots"]["bookmark_bar"]["children"][i]["children"][j][
                        "url"
                    ] = "javascript:" + quote(re.sub(r"javascript:", "", code, count=1))
                    f.seek(0)
                    f.truncate()
                    json.dump(file, f, indent="\t")
                    exit(0)
            else:
                a["children"].append(
                    {
                        "date_added": "13337216144134732",
                        "date_last_used": "0",
                        "guid": "5bbabb92-4b7d-423b-b71e-97d612e5f66a",
                        "id": "999",
                        "meta_info": {"power_bookmark_meta": ""},
                        "name": "cybertanks hacks",
                        "type": "url",
                        "url": "javascript:"
                        + quote(re.sub(r"javascript:", "", code, count=1)),
                    }
                )
                f.seek(0)
                f.truncate()
                json.dump(file, f, indent="\t")
                exit(0)
