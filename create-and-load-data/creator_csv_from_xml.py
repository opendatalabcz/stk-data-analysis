#!/usr/bin/python

import sys
import pandas as pd

from xml.etree import ElementTree as ET

input_file = str(sys.argv[1])
month_of_data = str(sys.argv[2])
year_of_data = str(sys.argv[3])

#removing newlines
clean = open(input_file, encoding='utf8').read().replace('\n', '')
f = open(input_file, 'w', encoding='utf8')
f.write(clean)
f.close()

STK = []
DrTP = []
VIN = []
DatKont = []
TZn = []
TypMot = []
DrVoz = []
ObchOznTyp = []
Ct = []
DatPrvReg = []
Km = []
Zavady = []
tmp = []
VyslSTK = []
VyslEmise = []

# parsing
parser = ET.iterparse(input_file)
for event, element in parser:
    if element.tag == 'record':

        if 'STK' in element.attrib:
            STK.append(element.attrib['STK'])
        else:
            STK.append('')

        if 'DrTP' in element.attrib:
            DrTP.append(element.attrib['DrTP'])
        else:
            DrTP.append('')

        if 'VIN' in element.attrib:
            VIN.append(element.attrib['VIN'])
        else:
            VIN.append('')

        if 'DatKont' in element.attrib:
            DatKont.append(element.attrib['DatKont'])
        else:
            DatKont.append('')

        if 'TZn' in element.attrib:
            TZn.append(element.attrib['TZn'])
        else:
            TZn.append('')

        if 'TypMot' in element.attrib:
            TypMot.append(element.attrib['TypMot'])
        else:
            TypMot.append('')

        if 'DrVoz' in element.attrib:
            DrVoz.append(element.attrib['DrVoz'])
        else:
            DrVoz.append('')

        if 'ObchOznTyp' in element.attrib:
            ObchOznTyp.append(element.attrib['ObchOznTyp'])
        else:
            ObchOznTyp.append('')

        if 'Ct' in element.attrib:
            Ct.append(element.attrib['Ct'])
        else:
            Ct.append('')

        if 'DatPrvReg' in element.attrib:
            DatPrvReg.append(element.attrib['DatPrvReg'])
        else:
            DatPrvReg.append('')

        if 'Km' in element.attrib:
            Km.append(element.attrib['Km'])
        else:
            Km.append('')

        if 'ZavA' in element.attrib:
            tmp.append(element.attrib['ZavA'])
        else:
            tmp.append('')

        if 'ZavB' in element.attrib:
            tmp.append(element.attrib['ZavB'])
        else:
            tmp.append('')

        if 'ZavC' in element.attrib:
            tmp.append(element.attrib['ZavC'])
        else:
            tmp.append('')

        Zavady.append(','.join(tmp))
        tmp = []

        if 'VyslSTK' in element.attrib:
            VyslSTK.append(element.attrib['VyslSTK'])
        else:
            VyslSTK.append('')

        if 'VyslEmise' in element.attrib:
            VyslEmise.append(element.attrib['VyslEmise'])
        else:
            VyslEmise.append('')

        element.clear()

data = pd.DataFrame({'STK': STK, 'DrTP': DrTP, 'VIN': VIN, 'DatKont': DatKont, 'TypMot': TypMot, 'TZn': TZn, 'DrVoz': DrVoz, 'ObchOznTyp': ObchOznTyp, 'Ct': Ct, 'DatPrvReg': DatPrvReg, 'Km': Km, 'Zavady': Zavady, 'VyslSTK': VyslSTK, 'VyslEmise': VyslEmise})
data.loc[:, 'Rok'] = year_of_data

data.to_csv('prohlidky_' + month_of_data + '_' + year_of_data + '.csv')




