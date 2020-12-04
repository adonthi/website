lint:
	yarn eslint . --ext .js,.jsx,.ts,.tsx --fix
run:
	yarn start
docker-build:
	docker build -t sample:dev .
docker-run:
	docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true sample:dev
