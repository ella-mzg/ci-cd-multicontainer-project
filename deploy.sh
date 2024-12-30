VM_USER="${VM_USER:-}"
VM_HOST="${VM_HOST:-}"
PROJECT_NAME= "ci-cd-multicontainer-project"
TARGET_DIR="/home/$VM_USER/$PROJECT_NAME"

if [ -z "$VM_HOST" ]; then
    echo "VM_HOST is not set. Exiting."
    exit 1
fi

echo "Starting deployment..."

echo "Syncing files to $VM_USER@$VM_HOST:$TARGET_DIR..."
rsync -avz --exclude='.git/' --exclude='node_modules/' --exclude='venv/' ./ "$VM_USER@$VM_HOST:$TARGET_DIR/" || {
    echo "File sync failed. Exiting."
    exit 1
}

echo "Connecting to $VM_USER@$VM_HOST to start deployment..."
ssh -i ~/.ssh/id_rsa "$VM_USER@$VM_HOST" << 'EOF'
set -e
cd /home/$VM_USER/code || { echo "Project directory not found"; exit 1; }
docker-compose down || { echo "Failed to stop running containers"; exit 1; }
docker-compose up -d || { echo "Failed to start containers"; exit 1; }
echo "Deployment completed successfully!"
EOF
