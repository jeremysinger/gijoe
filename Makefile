

zip: clean
	git log -1 --format="version %h released %cd"  origin/main > ./gijoe_app/version_stamp.txt
	zip -r ~/Desktop/gijoe.zip ./Dockerfile custom/* package* README.md lightserver.js gijoe_app/* public/* ./version_stamp.txt

clean:
	rm -vf gijoe_app/version_stamp.txt
	rm -vf gijoe_app/savefiles/*.js
	git log -1 --format="version %h released %cd"  origin/main > ./gijoe_app/version_stamp.txt
