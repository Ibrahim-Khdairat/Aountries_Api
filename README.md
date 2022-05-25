# Countries API

## 1- The API given in the task : 
>https://restcountries.com/v3.1/all

<br><br><br>

## 2- To set the API data into DataBase :
 * use this route 
 >http://localhost:4010/country/setAllCountries



<br><br><br>

 ## 3- To get all countries from db
 * use this route 
 >http://localhost:4010/country/getAllCountries

<br><br><br>

 ## 4- To get a specific country : 
* use this route : 
>http://localhost:4010/country/getCountry

### - to get country by name : send this object in the body 
> {\
  &nbsp;  "name": "Bahrin" <br>
}

### -  to get country by CCA2/CCA3/CCN3 : send this object in the body 
> {\
  &nbsp;  "cca2": "UY"  
}

<br><br><br>

## 5- Get coontry currencies by CCA2 
* use this route
>http://localhost:4010/country/getCurrencies

and send this object in the body 
> {\
  &nbsp;  "cca2": "UY"  
}

<br><br><br>

## 6- Get Group countries : 
* use this route
> http://localhost:4010/country/groupCountries

### if you want to group by region :  send this object in body 
> {\
  &nbsp;  "region": "Americas"  
}

### if you want tyo group by language : send this object 
> {<br>
&nbsp;  "language" : "fra"<br>
}


<br><br><br>

## 6- Download Data : 

 * use this route
> http://localhost:4010/country/download


 and send in a header "X_ADMIN = 1"