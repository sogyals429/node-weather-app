build:
	docker build -t weather-app .

ecr:
	aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 413817614433.dkr.ecr.ap-southeast-2.amazonaws.com
	docker build -t weather-app .
	docker tag weather-app:latest 413817614433.dkr.ecr.ap-southeast-2.amazonaws.com/weather-app:latest
	docker push 413817614433.dkr.ecr.ap-southeast-2.amazonaws.com/weather-app:latest
