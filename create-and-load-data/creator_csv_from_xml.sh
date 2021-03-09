sed "1i <?xml version=\"1.0\" encoding=\"UTF-8\"?><records>" $1 > tmp
echo "</records>" >> tmp
rm $1
mv tmp $1

python3 creator_csv_from_xml.py $1 $2 $3