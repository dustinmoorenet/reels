for i in client/files/*.mp4; do
    file=`basename "$i" .mp4`
    ffmpeg -i "$i" -c:v libx264 -preset slow -s 640x480 -an -b:v 740K "dist/files/$file-740k.mp4"
done
