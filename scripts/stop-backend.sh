if docker ps -q 2>&1 > /dev/null; then
    docker container stop preqin-backend
    echo "\033[0;32mServer shut down!! \n"
else
    echo "\033[0;31mInstall Docker"
fi