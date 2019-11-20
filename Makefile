build-prod:
	docker-compose build
up-prod:
	docker-compose up

build-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
