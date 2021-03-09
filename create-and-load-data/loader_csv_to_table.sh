#!/bin/bash
MENO_SUBORU="$1"
ssh root@193.85.191.172 << EOF
su - postgres
psql
\c odl_stk_data
\COPY all_kontroly (id, stk, drtp, vin, datkont, typmot, tzn, drvoz, obchozntyp, ct, datprvreg, km, zavady, vyslstk, vyslemise, rok) FROM '$MENO_SUBORU' DELIMITER ',' CSV HEADER;
EOF