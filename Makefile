worker:
	@terser worker.js -m --toplevel -c -o worker.min.js
	@echo "data:text/javascript;base64,\c" > worker && (cat worker.min.js | base64 | tr -d '\n') >> worker
	@pbpaste
	@pbcopy < worker
done:
	@terser main.js -m --toplevel -c -o main.min.js
	@sed -i '' '1s/^/javascript:/' main.min.js
copy:
	@pbpaste
	@pbcopy < main.min.js
test:
	@cat /Users/davidzhao/Library/Application\ Support/Google/Chrome/Profile\ 1/Bookmarks

.PHONY: worker