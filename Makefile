dc := docker-compose -f ./docker-compose.yml

up:
	$(dc) up -d	

down:
	$(dc) down

restart:
	$(dc) restart

reup:
	@make down
	@make up

rmi:
	$(dc) down --rmi all
	@make up

ps:
	$(dc) ps

logs:
	$(dc) logs

logsf:
	$(dc) logs -f

mysql:
	$(dc) exec -it mysql bash  -c "mysql -u root -p e-ten"  


