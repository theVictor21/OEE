var jq=jQuery.noConflict();
var selKey="";

function init(){
	//alert("init");
    console.log("init inline js");
    navigator.notification.alert(
                                 'Init!',           // message
                                 alertDismissed,    // callback
                                 'Init',            // title
                                 'Done'             // buttonName
                                 );
    
	//heijunka.listAlSchedulelKeys();
	
} //end init


jq( document ).on( 'pageinit', '#newOeeLogPage' ,function(event){
	
	var equipment="";
	var sft="";
	var prdLead="";
	var prdDate="";
	
	jq("#equipmentInput").change(function(){
		equipment = jq("#equipmentInput").val();  
		jq("#eqpNameTxt").text(equipment);
	});
	jq("#shiftInput").change(function(){
		sft = jq("#shiftInput").val();  
		jq("#shiftTxt").text(sft);
	});
	jq("#prdLeadInput").change(function(){
		prdLead = jq("#prdLeadInput").val();  
		jq("#prdLeadTxt").text(prdLead);
	});
	jq("#prdDateInput").change(function(){
		var myDate = new Date(jq("#prdDateInput").val());
		prdDate = sfDateFormat(myDate);
		jq("#prdDateTxt").text(prdDate);
	});
	
	
	
	// VALIDATE HEADER PAGE FORM
	jq("#nextBtn").click(function(){
		if(equipment !==""){
			jq("#err1").hide();
		} else{
			jq("#err1").show();
		}
		
		if(sft !==""){
			jq("#err2").hide();
		} else{
			jq("#err2").show();
		}
		
		if(prdLead !==""){
			jq("#err3").hide();
		} else{
			jq("#err3").show();
		}
		
		if(prdDate !==""){
			jq("#err4").hide();
		} else{
			jq("#err4").show();
		}
	
		if(equipment !="" && sft !="" && prdLead !="" && prdDate !==""){
			jq.mobile.changePage( "#oeeLogPage", { transition: "slide"});
		} else{
			jq("#spError").html("Error exists in the item(s) marked in red").css("color","#990033");
		}
	}); //end nextBtn
	
	
	//ADD A LOG
  	jq("#oeeFormAddALogBtn").click(function(){
         //REMOVE ERROR AT FIRST SHOWING
        jq("#oeeFormPage").on( 'pageshow',function(event){
            jq("#updateOeeFormBtn[type='button']").button('disable').button("refresh");
            jq("#saveOeeFormBtn[type='button']").button('enable').button("refresh");
        });
        jq.mobile.changePage( "#oeeFormPage", { transition: "pop", role: "dialog" });
        clearOeeFormPage();
  	});  //end oeeFormAddALogBtn
	
	
	
	//SF DATE FORMAT MM/DD/YYYY
    function sfDateFormat(dateString){
        var myDate = new Date(dateString);
        var YYYY = myDate.getUTCFullYear();
        var MM = myDate.getUTCMonth()+1;
        var DD = myDate.getUTCDate();
        
        if(MM>=10){
            MM = MM;
        } else{
            MM = "0"+MM;
        }
        if(DD>=10){
            DD = DD;
        } else{
            DD = "0"+DD;
        }
        //console.log(MM);
        var formatedDate = MM+"/"+DD+"/"+YYYY;
        return formatedDate;
    }
    
    //DATE FORMAT YYYY-MM-DD
    function dateFormat(dateString){
        var myDate = new Date(dateString);
        var YYYY = myDate.getUTCFullYear();
        var MM = myDate.getUTCMonth()+1;
        var DD = myDate.getUTCDate();
        
        if(MM>=10){
            MM = MM;
        } else{
            MM = "0"+MM;
        }
        if(DD>=10){
            DD = DD;
        } else{
            DD = "0"+DD;
        }
        console.log(MM);
        var formatedDate = YYYY+"-"+MM+"-"+DD;
        return formatedDate;
    };
    
    //DURATION IN DAYS CALCULATION
    function durationInDays(startDate, endDate){
        var sDate = new Date(startDate);
        var eDate = new Date(endDate);
        
        if(sDate>eDate){
            alert("Start Date cannot be later than End Date");
        } else{
            var milliseconds = eDate-sDate;
            var durInDays = milliseconds/(24*60*60*1000);
        }
        return durInDays;
    };
    
    //VALIDATE DATES
    function validateDates(startDate, endDate){
        var sDate = new Date(startDate);
        var eDate = new Date(endDate);
        var validDates;
        if(sDate>=eDate){
            alert("End Date must be later than Start Date.");
            validDates = "false";
        } else{
            validDate = "true";
        }
        return validDate;
    };
	
	
});  //end doc ready


    
	






jq("#takeapicBtn").click(function(){
                         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                                                     destinationType: Camera.DestinationType.FILE_URI
                                                     });
                         });

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
    console.log(imageURI);
}

function onFail(message) {
    //alert('Failed because: ' + message);
    navigator.notification.alert(
                                 message,               // message
                                 alertDismissed,        // callback
                                 'Ooops!',          // title
                                 'OK'                   // buttonName
                                 );
}

function alertDismissed() {
    // do something
}
