worker:
	@terser worker.js -m --toplevel -c -o worker.min.js
	@echo "data:text/javascript;base64,\c" > worker && (cat worker.min.js | base64 | tr -d '\n') >> worker
	@pbpaste
	@pbcopy < worker
min:
	@terser main.js -m --toplevel -c -o main.min.js
	@sed -i '' '1s/^/javascript:/' main.min.js
	@make drive
	@make save
save:
	@python3 edit_bookmarks.py ~/Library/Application\ Support/Google/Chrome/Profile\ 1/Bookmarks main.min.js
	@open -a Google\ Chrome "chrome:quit" --args --"profile-directory"="Profile 1"
drive:
	@touch ~/Google\ Drive/My\ Drive/Cybertanks/minify.js
	@cat main.min.js > ~/Google\ Drive/My\ Drive/Cybertanks/minify.js

.PHONY: worker