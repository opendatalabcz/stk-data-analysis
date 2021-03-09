# stk-data-analysis

### Nacitanie dat do tabulky (all_kontroly)

1. Pomocou **creator_csv_from_xml.sh** scriptu vytvorime validny .csv subor z daneho .xml suboru.
    Vysledny .csv subor bude pripraveny na priame nahratie do tabulky.  
    Scriptu je potrebne zadat tri parametre: 
        1. cestu k .xml suboru, ktory obsahuje potrebne data 
        2. mesiac/e v ciselnom formate, obdobie zberu dat (cely rok vo formate 1-12)
        3. rok, z ktoreho data pochadzaju  
- Priklad: `./creator_csv_from_xml.sh .../STK/STK_data_2018/Seznam_prohlídek_STK_2018.xml 1-12 2018`

2. Pred nahranim dat do tabulky je potrebne nahrat dany .csv subor do /tmp adresara na serveri VM-BDF-DEBEZIUM (172.16.20.119).  
- Priklad: `scp prohlidky_1-12_2018.csv ssh root@193.85.191.172:/tmp`

3. Nacitanie dat do tabulky *all_kontroly* v databaze *odl_stk_data* sa prevedie so scriptom **loader_csv_to_table.sh**. 
Parameter dostane ako cestu v /tmp adresari k danemu .csv suboru. 
- Priklad: `./loader_csv_to_table.sh /tmp/prohlidky_1-12_2018.csv`
