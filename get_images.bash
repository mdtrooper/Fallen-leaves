#! /bin/bash

count=$(cat test.json | jq '.posts | length');

first=1

clean_json=$(
echo "[";
for i in $(seq 0 $(( $count - 1)));
do
    if [ $first -ne 1 ];
    then
        echo ",";
    fi
    first=0

    cat test.json | jq ".posts[$i][\"photo-url-1280\"]"
done
echo "]";
)

echo $clean_json;
