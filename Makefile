# OSX Makefile

PHANTOM := /usr/local/bin/phantomjs

gifs.urls: $(PHANTOM) build.js
	$(PHANTOM) --debug=false build.js "$(ROOT_URL)" | tee -a gifs.urls

build.js: q.js scrape.js
	cat q.js scrape.js > build.js

# cat ~/scraper/gifs.urls | sort | uniq | xargs -P 8 -I{} sh -c 'test -e $(basename "{}") || curl -s -O "{}"'

clean:
	rm gifs.urls
	rm build.js
