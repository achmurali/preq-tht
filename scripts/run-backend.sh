if docker ps -q 2>&1 > /dev/null; then
    echo "\033[0;32mYou are Dockered!! \n"

    if docker ps -a | grep preqin-backend ; then
        echo "\033[0;32mResumed preqin-backend!!"
    else
        echo "\033[0;32mCreating preqin-backend!! \n"
        docker build -t preqin-api -f ./backend/Dockerfile ./backend && docker run --publish 8000:8000 -d --name preqin-backend preqin-api
    fi
else
    echo "\033[0;31mInstall Docker"
fi