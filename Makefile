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