# ===============================
# Variables
# ===============================
DOCKER_COMPOSE = docker compose
SERVICE_APP = app

# ===============================
# Levantar todo el entorno
# ===============================
start:
	$(DOCKER_COMPOSE) up --build -d
	@echo "🚀 Proyecto levantado en:"
	@echo "   👉 http://localhost:3000"

# ===============================
# Ver logs en tiempo real
# ===============================
logs:
	$(DOCKER_COMPOSE) logs -f

# ===============================
# Bajar el entorno
# ===============================
down:
	$(DOCKER_COMPOSE) down

# ===============================
# Rebuild completo
# ===============================
rebuild:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build -d

# ===============================
# Eliminar contenedores + volúmenes
# (borra la base de datos)
# ===============================
clean:
	$(DOCKER_COMPOSE) down -v
	@echo "🧹 Contenedores y volúmenes eliminados"

# ===============================
# Ejecutar prisma db push manual
# ===============================
db-push:
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) npx prisma db push

# ===============================
# Entrar al contenedor app
# ===============================
shell:
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) sh

# ===============================
# Ejecutar migración de Prisma
# Uso:
# make migrate NAME=nombre_migracion
# ===============================
migrate:
	@if [ -z "$(NAME)" ]; then \
		echo "❌ Debes proporcionar un nombre: make migrate NAME=nombre_migracion"; \
		exit 1; \
	fi
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) npx prisma migrate dev --name $(NAME)

# ===============================
# Ejecutar seed para base de datos
# ===============================
seed:
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) npx prisma db seed