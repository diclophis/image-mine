# Makefile

PHANTOM := /usr/local/bin/phantomjs

# primary output is a file of image urls
gifs.urls: $(PHANTOM) build.js
	$(PHANTOM) --debug=false build.js "$(ROOT_URL)" | tee -a gifs.urls

# build.js is the combined and optimized JS source file
build.js: q.js scrape.js
	cat q.js scrape.js > build.js

# cat gifs.urls | sort | uniq | xargs -P 8 -I{} sh -c 'test -e $(basename "{}") || curl -s -O "{}"'
#ls -1 /tmp/gifs/*.gif | cut -d\/ -f4 | xargs -R 1 -n 1 -p -I % sh -c '(test -e /tmp/gifs/$(basename "%" .gif).png || ./gif2apng "%") && echo /tmp/gifs/$(basename "$(ls -1sSr /tmp/gifs/$(basename "%" .gif)* | head -n 1)") /tmp/final/'

clean:
	rm gifs.urls
	rm build.js
