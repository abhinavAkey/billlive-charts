'use restrict';

angular.module('webApp.charts', ['ngRoute',"ng-fusioncharts"])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/charts', {
		templateUrl: 'charts/charts.html',
		controller: 'ChartsCtrl'
	});
}])

.controller('ChartsCtrl', ['$scope','$http','$rootScope', 'CommonProp', '$firebaseArray', '$firebaseObject','$location', function($scope,$http,$rootScope, CommonProp, $firebaseArray, $firebaseObject,$location){


  $rootScope.username = CommonProp.getUser();

  $scope.isRegistered = true;
  if (!$rootScope.username) {
    $location.path('/login');
  }
	
	if($scope.isRegistered == false){

		//console.log("this user is not registered");
		window.location = "#/register";
  }
  
  $scope.logout = function(){
		CommonProp.logoutUser();
    }
    
    // $scope.filterDate = function(){
    //     var product = $scope.productName;
    //     var year = $scope.yearsList;
    //     var district = $scope.district;
    //     var state = document.getElementById('state').options[document.getElementById('state').selectedIndex].innerHTML;

    //     $scope.getData("","","","");

        

    // }
   
   
 $scope.getData = function(product,year,state,district){
    $http
    .get('http://ec2-54-236-19-206.compute-1.amazonaws.com/billlive/company/getexcelreport?itemname=BPT STEAM RICE&state=ANDHRA PRADESH&district=VIZIANAGARAM.&year=117&companyId=c3456')
    .then(function(response){
        $scope.itemsData = response.data;
        console.log($scope.itemsData.data);
        $scope.final = {
            "chart": {
            "caption": "Sale of Products",
            "subCaption": "Annual Sale",
            "xAxisName": "Month",
            "yAxisName": "Gross (In Rupees)",
            "numberPrefix": "Rs",
            "paletteColors": "#0075c2",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "plotBorderAlpha": "10",
            "usePlotGradientColor": "0",
            "plotFillAlpha": "50",
            "showXAxisLine": "1",
            "axisLineAlpha": "25",
            "divLineAlpha": "10",
            "showValues": "1",
            "showAlternateHGridColor": "0",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "plottooltext" : "$displayValue"
            
        },"data": $scope.itemsData.data }
        $scope.myDataSource = JSON.stringify($scope.final);
        console.log("final data ",JSON.stringify($scope.myDataSource));
    }, function(error){
        console.log(error);
    })


}
    $scope.uploadCsv = function(){
        
          var f = document.getElementById('file').files[0];
         var fd = new FormData();
         
          fd.append('uploadFile', f);
          
          var request = new XMLHttpRequest();
          request.onreadystatechange = function () {
                
              console.log(request.readyState);
              console.log(this.status);
              console.log(JSON.stringify(this.response));
  
              if (this.readyState == 4 && this.status == 200) {
                var data = this.response;
                $scope.getData("","","","");

              }
          }
          request.open("POST", "http://ec2-54-236-19-206.compute-1.amazonaws.com/billlive/company/loadexcel?companyId=c3456", true)
          request.send(fd)
        }

   
$scope.states = {"Andhra Pradesh" : ["Anantapur","Chittoor","East Godavari","Guntur","Krishna","Kurnool","Prakasam","Srikakulam","SriPotti Sri Ramulu Nellore","Vishakhapatnam","Vizianagaram","West Godavari","Cudappah"],"Arunachal Pradesh" : ["Anjaw","Changlang","Dibang Valley","East Siang","East Kameng","Kurung Kumey","Lohit","Longding","Lower Dibang Valley","Lower Subansiri","Papum Pare","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],    "Assam": ["Baksa","Barpeta","Bongaigaon","Cachar","Chirang","Darrang","Dhemaji","Dima Hasao","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Jorhat","Kamrup","Kamrup Metropolitan","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","Tinsukia","Udalguri"],"Bihar": ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"],     "Chhattisgarh": ["Bastar","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Jashpur","Janjgir-Champa","Korba","Koriya","Kanker","Kabirdham (formerly Kawardha)","Mahasamund","Narayanpur","Raigarh","Rajnandgaon","Raipur","Surajpur","Surguja"],"Dadra and Nagar Haveli" : ["Amal","Silvassa"],"Daman and Diu": ["Daman","Diu"],"Delhi": ["Delhi","New Delhi","North Delhi","Noida","Patparganj","Sonabarsa","Tughlakabad"],"Goa": ["Chapora","Dabolim","Madgaon","Marmugao (Marmagao)","Panaji Port","Panjim","Pellet Plant Jetty/Shiroda","Talpona","Vasco da Gama"],     "Gujarat": ["Ahmedabad","Amreli district","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Dahod","Dang","Gandhinagar","Jamnagar","Junagadh","Kutch","Kheda","Mehsana","Narmada","Navsari","Patan","Panchmahal","Porbandar","Rajkot","Sabarkantha","Surendranagar","Surat","Tapi","Vadodara","Valsad"],"Haryana": ["Ambala","Bhiwani","Faridabad","Fatehabad","Gurgaon","Hissar","Jhajjar","Jind","Karnal","Kaithal","Kurukshetra","Mahendragarh","Mewat","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamuna Nagar"],"Himachal Pradesh": ["Baddi","Baitalpur","Chamba","Dharamsala","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul & Spiti","Mandi","Simla","Sirmaur","Solan","Una"],   "Jammu and Kashmir": ["Jammu","Leh","Rajouri","Srinagar"],"Jharkhand": ["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribag","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahibganj","Seraikela Kharsawan","Simdega","West Singhbhum"],"Karnataka": ["Bagalkot","Bangalore","Bangalore Urban","Belgaum","Bellary","Bidar","Bijapur","Chamarajnagar", "Chikkamagaluru","Chikkaballapur","Chitradurga","Davanagere","Dharwad","Dakshina Kannada","Gadag","Gulbarga","Hassan","Haveri district","Kodagu","Kolar","Koppal","Mandya","Mysore","Raichur","Shimoga","Tumkur","Udupi","Uttara Kannada","Ramanagara","Yadgir"],"Kerala": ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thrissur","Thiruvananthapuram","Wayanad"],"Madhya Pradesh": ["Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhilai","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Dewas","Dhar","Guna","Gwalior","Hoshangabad","Indore","Itarsi","Jabalpur","Khajuraho","Khandwa","Khargone","Malanpur","Malanpuri (Gwalior)","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Pithampur","Raipur","Raisen","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Singrauli","Ujjain"],"Maharashtra": ["Ahmednagar","Akola","Alibag","Amaravati","Arnala","Aurangabad","Aurangabad","Bandra","Bassain","Belapur","Bhiwandi","Bhusaval","Borliai-Mandla","Chandrapur","Dahanu","Daulatabad","Dighi (Pune)","Dombivali","Goa","Jaitapur","Jalgaon","Jawaharlal Nehru (Nhava Sheva)","Kalyan","Karanja","Kelwa","Khopoli","Kolhapur","Lonavale","Malegaon","Malwan","Manori","Mira Bhayandar","Miraj","Mumbai (ex Bombay)","Murad","Nagapur","Nagpur","Nalasopara","Nanded","Nandgaon","Nasik","Navi Mumbai","Nhave","Osmanabad","Palghar","Panvel","Pimpri","Pune","Ratnagiri","Sholapur","Shrirampur","Shriwardhan","Tarapur","Thana","Thane","Trombay","Varsova","Vengurla","Virar","Wada"],"Manipur": ["Bishnupur","Churachandpur","Chandel","Imphal East","Senapati","Tamenglong","Thoubal","Ukhrul","Imphal West"],"Meghalaya": ["Baghamara","Balet","Barsora","Bolanganj","Dalu","Dawki","Ghasuapara","Mahendraganj","Moreh","Ryngku","Shella Bazar","Shillong"],"Mizoram": ["Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip"],"Nagaland": ["Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Peren","Phek","Tuensang","Wokha","Zunheboto"],    "Orissa": ["Bahabal Pur","Bhubaneswar","Chandbali","Gopalpur","Jeypore","Paradip Garh","Puri","Rourkela"],    "Puducherry": ["Karaikal","Mahe","Pondicherry","Yanam"],    "Punjab": ["Amritsar","Barnala","Bathinda","Firozpur","Faridkot","Fatehgarh Sahib","Fazilka","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Sri Muktsar Sahib","Pathankot",                                        "Patiala","Rupnagar","Ajitgarh (Mohali)","Sangrur","Shahid Bhagat Singh Nagar","Tarn Taran"],    "Rajasthan": ["Ajmer","Banswara","Barmer","Barmer Rail Station","Basni","Beawar","Bharatpur","Bhilwara","Bhiwadi","Bikaner","Bongaigaon","Boranada, Jodhpur","Chittaurgarh","Fazilka","Ganganagar","Jaipur","Jaipur-Kanakpura",                                       "Jaipur-Sitapura","Jaisalmer","Jodhpur","Jodhpur-Bhagat Ki Kothi","Jodhpur-Thar","Kardhan","Kota","Munabao Rail Station","Nagaur","Rajsamand","Sawaimadhopur","Shahdol","Shimoga","Tonk","Udaipur"],     "Sikkim": ["Chamurci","Gangtok"],        "Tamil Nadu": ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Mandapam","Nagapattinam","Nilgiris","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Thiruvallur","Tirupur",                                   "Tiruchirapalli","Theni","Tirunelveli","Thanjavur","Thoothukudi","Tiruvallur","Tiruvannamalai","Vellore","Villupuram","Viruthunagar"],    "Telangana": ["Adilabad","Hyderabad","Karimnagar","Mahbubnagar","Medak","Nalgonda","Nizamabad","Ranga Reddy","Warangal"],    "Tripura": ["Agartala","Dhalaighat","Kailashahar","Kamalpur","Kanchanpur","Kel Sahar Subdivision","Khowai","Khowaighat","Mahurighat","Old Raghna Bazar","Sabroom","Srimantapur"],    "Uttar Pradesh": ["Agra","Allahabad","Auraiya","Banbasa","Bareilly","Berhni","Bhadohi","Dadri","Dharchula","Gandhar","Gauriphanta","Ghaziabad","Gorakhpur","Gunji",                                    "Jarwa","Jhulaghat (Pithoragarh)","Kanpur","Katarniyaghat","Khunwa","Loni","Lucknow","Meerut","Moradabad","Muzaffarnagar","Nepalgunj Road","Pakwara (Moradabad)","Pantnagar","Saharanpur","Sonauli","Surajpur","Tikonia","Varanasi"],"Uttarakhand": ["Almora","Badrinath","Bangla","Barkot","Bazpur","Chamoli","Chopra","Dehra Dun","Dwarahat","Garhwal","Haldwani","Hardwar","Haridwar","Jamal","Jwalapur","Kalsi","Kashipur","Mall","Mussoorie","Nahar","Naini","Pantnagar","Pauri","Pithoragarh","Rameshwar","Rishikesh","Rohni","Roorkee","Sama","Saur"],"West Bengal": ["Alipurduar","Bankura","Bardhaman","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Kolkata","Maldah","Murshidabad","Nadia","North 24 Parganas","Paschim Medinipur","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"] };

$scope.product_name = 
    ["BPT STEAM RICE",
"RUPALI STEAM RICE",
"RAW BRAN",
"GUNNIES SMALL OLD",
"BOILED BRAN",
"SUREKHA BOILED RICE",
"JAYA BOILED RICE",
"HMT STEAM RICE",
"PL MASOORI STEAM RICE",
"RAVVA POWDER",
"IDLY RAVVA - VSP",
"1010 BOILED REJECTION",
"RJL STEAM RICE",
"ASH",
"Husk",
"RICE RAVVA",
"BPT STEAM SIGLE POLISHED RICE",
"IDLY RAVVA - VJY",
"1121 BASMATI STEAM RICE",
"1010 RAW BIG BROKENS",
"BPT STEAM REJECTION",
"PL MASOORI STEAM BIG BROKENS",
"BPT STEAM - BIG BROKENS",
"DUGARA",
"KURUVA BOILED RICE",
"POLLU",
"1001 BOILED RICE",
"BPT STEAM SMALL BROKENS",
"IR64 BOILED BROKENS",
"SILKY BRAN",
"RAW CHERU",
"1010 Raw Rejection Rice",
"HMT STEAM BIG BROKENS",
"RJL STEAM REJECTION",
"ALL MIXED REJECTION",
"BPT RAW RICE",
"PL MASOORI STEAM REJECTION",
"HMT STEAM REJECTION",
"RUPALI STEAM REJECTION",
"BOILED CHERU",
"ALL MIXED CHERU",
"NO.2 BRAN STEAM CHERU",
"1010 STEAMSHIFTER BROKENS",
"BOILED REJECTION RICE",
"BASMATI RICE",
"BPT KELI",
"BOILED POULTRY FEED BROKENS",
"1010 RAW REJECTION",
"RAW POULTRY FEED BROKENS",
"POULTRY FEED BROKENS"]

// $scope.years=["2017","2016","2015"]

$scope.years=[
    {
        "year":"2017",
        "value":"117"
    }
]

}]);
