//GLOBAL VARS
var viewport = {
	width: $(window).width(),
	height: $(window).height(),
	panelwidth: $('#all-container').width()
};

var appui = {
	footerHeight: 48,
	headerHeight: 47
};

var REST_PATH = "http://ec2-54-242-131-102.compute-1.amazonaws.com/rest/"

var myScroll = null;
var newsScroll = null;
var eventsScroll = null;
var homeScroll = null;
var actionScroll = null;
var bundlesScroll = null;
var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
var sliding = 0;
var startClientX = 0;
var startPixelOffset = 0;
var pixelOffset = 0;

var aboutModal = {
	ModalID: "modal-about",
	PageID: "about",
	PageHeading: "About",
	PageTitle: "The About Page",
	PageContent: '<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>'
};

var createSomethingModal = {
	ModalID: "modal-create",
	PageID: "create",
	PageHeading: "Create",
	PageTitle: "Create",
	PageContent: '<p>Here you can create something, I believe.</p><div id="create-buttons-holder"><button type="button" id="poll-button" class="rb-btn blue">+ Create Poll</button><button type="button" id="petition-button" class="rb-btn blue">+ Create Petition</button><button type="button" id="campaign-button" class="rb-btn blue">+ Create Campaign</button><button type="button" id="bundle-button" class="rb-btn blue">+ Create Bundle</button></div>'
};

var createAccountModal = {
ModalID: "modal-create-account",
PageID: "create-account",
PageHeading: "Create Account",
PageTitle: "Create a Mobylyze Account",
PageContent: '<div class="fb-button"><button type="button" id="fb-btn-join" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="join-form"><form id="the-join-form" name="join-form"><div class="field-grouper"><input type="text" id="join-first" class="required" placeholder="First Name" name="FirstName"><input type="text" id="join-last" class="required" placeholder="Last Name" name="LastName"><input type="email" id="join-username" class="required" placeholder="Email Address" name="Email"><input type="text" id="join-zip" class="required" placeholder="Zip Code" name="ZipCode"><input type="password" id="join-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="create-account-submit" class="rb-btn red">Create Account</button></form></div><div id="main-body-sub-links"></div>'
};

var testDetail = {
	DetailID: "details-test",
	PageID: "details",
	Depth: "1",
	PageHeading: "Item Details",
	PageContent: '<ul id="test-list" depth="1"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
};
var testDetail2 = {
	DetailID: "details-test-2",
	PageID: "details",
	Depth: "2",
	PageHeading: "Item Details 2",
	PageContent: '<ul id="test-list" depth="2"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
};
var testDetail3 = {
	DetailID: "details-test-3",
	PageID: "details",
	Depth: "3",
	PageHeading: "Item Details 3",
	PageContent: '<ul id="test-list" depth="3"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
};
var testDetail4 = {
	DetailID: "details-test-4",
	PageID: "details",
	Depth: "4",
	PageHeading: "Item Details 4",
	PageContent: '<ul id="test-list" depth="4"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
};
var youContentAnon = {
	PageID: "page-anonymous",
	PageHeading: "Log In",
	ContentID: "you-content-anon",
	PageContent: '<div class="fb-button"><button type="button" id="fb-btn-signin" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><div class="field-grouper"><input type="email" id="signin-username" class="required" placeholder="Email Address" name="Email"><input type="password" id="signin-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="signin-submit" class="rb-btn red">Log In</button></div><br><div id="main-body-sub-links">Don\'t have an account? <a id="btn-create-account" href="#" data-ajax="false">Create One Now</a></p></div>'
};

var youContentAuth = {
	PageID: "page-authenticated",
	PageHeading: "You",
	ContentID: "you-content-anon",
	PageContent: '<button type="button" id="user-profile-button" class="rb-btn blue">Profile</button><button type="button" id="user-network-button" class="rb-btn blue">Network</button><button type="submit" id="user-actions-button" class="rb-btn blue">Actions</button><button type="submit" id="user-events-button" class="rb-btn blue">Events</button><button type="submit" id="user-bundles-button" class="rb-btn blue">Bundles</button><button type="button" id="signout-submit" class="rb-btn orange">Sign Out</button>'
};

var transitionEnd = 'webkitTransitionEnd';


//GLOBAL FUNCTIONS
function getUser() {
    console.log('getting user from local storage');
    
	if (window.localStorage.length != 0 && window.localStorage['user'] != null) {
		var currentUser = JSON.parse(window.localStorage['user']);
		return currentUser;
	}
	return null;
}

//SYSTEM FUNCTIONS
function connect(success, failed)
{
    // Define the URL to register this user
    var url = REST_PATH + "system/connect";
    console.log(url);
    
    // Use $.ajax to POST the new user
    $.ajax({
           type: "POST",
           url: url,
           dataType: "json",
           contentType: "application/json",
           // On success we pass the response as res
           success: function(res) {

           success()
           
           
           },
           error: function(jqXHR, textStatus, errorThrown) {
           failed();
           }
           });

}
//END SYSTEM FUNCTIONS
//USER FUNCTIONS
function createUser(userName, password, firstName, lastName, zipCode, success, failed) {
	var newUser = {
        "name": userName,
        "pass": password,
        "mail": userName,
        "field_firstname": {
            "und": [{"value": firstName}]
        },
        "field_lastname": {
            "und": [{"value": lastName}]
        },
        "field_zipcode": {
            "und": [{"value": zipCode}]
        }
    };
    
    console.log(newUser);
    
    // Define the URL to register this user
    var url = REST_PATH + "user/register.json";
    console.log(url);
    
    // Use $.ajax to POST the new user
    $.ajax({
           type: "POST",
           url: url,
           dataType: "json",
           data: JSON.stringify(newUser),
           contentType: "application/json",
           // On success we pass the response as res
           success: function(res) {
           console.log('account created');
           
           // res will be an object including the uid and the uri to the new user
           //new to go get it here
           window.localStorage["user"] = JSON.stringify(res);
           success();
           
           
           },
           error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error Occured ' + textStatus);
            failed();
           }
           });
    
}

function loginUser(userName, password, success, failed) {

    // Create an object to hold the data entered in the form
	var user = {
    username: userName,
    password: password
	}
	
	// Define the url which contains the full url
	// in this case, we'll connecting to http://example.com/api/rest/user/login
	var url = REST_PATH + 'user/login';
	
    // Use $.ajax to POST the new user
    $.ajax({
           type: "POST",
           url: url,
           dataType: "json",
           data: JSON.stringify(user),
           contentType: "application/json",
           // On success we pass the response as res
           success: function(res) {
           console.log('account logged in');
           console.log(res);
           window.localStorage["user"] = JSON.stringify(res);
           success();
           },
           error: function(jqXHR, textStatus, errorThrown) {
           console.log('Error Occured ' + textStatus);
           failed();
           }
           });
}

function logoutUser(success, failed) {
    // Define the url which contains the full url
	// in this case, we'll connecting to http://example.com/api/rest/user/logout
	var url = REST_PATH + 'user/login';
	
    // Use $.ajax to POST the new user
    $.ajax({
           type: "POST",
           url: url,
           dataType: "json",
           data: JSON.stringify(user),
           contentType: "application/json",
           // On success we pass the response as res
           success: function() {
            console.log('account logged out');
            window.localStorage.removeItem("user");
           
            success();
           },
           error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error Occured ' + textStatus);
            window.localStorage.removeItem("user");
            failed();
           }
    });
}
// END USER FUNCTIONS

function updateProfile() {

	$('#profile-container').empty();
	var user = getUser();
    
	var source = $('#profile-template').html();
	var template = Handlebars.compile(source);
	var data = youContentAnon;
	if (user !== null) {
		data = youContentAuth;
	}
	var content = template(data);
	$('#profile-container').append(content);
    resetPositioning();
	resetSizing();
}

function whichTransitionEvent() {
	var t;
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition': 'transitionEnd',
		'OTransition': 'otransitionend',
		'MSTransition': 'msTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}

function resetSizing() {
	$('#profile-container').css('width', (viewport.panelwidth - 48) + 'px');
	$('#pages > div.page').css('width', viewport.panelwidth + 'px');
	$('.container').css('height', viewport.height + 'px');
	$('#wrapper').css('height', (viewport.height - (appui.footerHeight + appui.headerHeight) + 'px'));
	$('.scroller.wf').css('height', (viewport.height - (appui.footerHeight + appui.headerHeight) + 'px'));
	$('#main-content').css('height', $('#pages > div.page.current').height() + 'px');
	$('div.page').css('min-height', viewport.height + 'px');
}

function resetViewport() {
	viewport.height = $(window).height();
	viewport.width = $(window).width();
	viewport.panelwidth = $('#all-container').width();
}

function resetPositioning() {
	$('body, html').css('top', '0px');
	$('.container').css('top', '0px');
	$('.container.slid-right').css("left", (viewport.panelwidth - 48) + "px");
	$('.modal-container.slid-up').css("top", "0px");
}

function hideOtherPages() {
	$('#pages > div.page').css("display", "none");
	$('#pages > div.page.current').css("display", "block");
}

function showEmptyLoader(message) {
	$('.loader').remove();
	
	var loady = $('<div class="loader"><p><span class="loader-image" /></span><span class="loader-message" /></span></div>');

	$('.page.current').prepend(loady);
	$('.loader').css('display', 'block');
	$('.loader').css('opacity', '1.0');
	$('.loader').css("height", $('.loader').height());
	if (message) {
		$(".loader-message").text(message);
	} else {
		$(".loader-message").empty();
	}
	
}
function showLoader(pageName) {
	$('#' + pageName + ' .loader').css('display', 'block');
	$('#' + pageName + ' .loader').css('opacity', '1.0');
	$('#' + pageName + ' .loader').css("height", '50px');
}
function hideLoader(pageName) {
	$('#' + pageName + ' .loader').css('opacity', '0');
	$('#' + pageName + ' .loader').css("height", '0px');
}

function pullDownAction() {
	var el, li, i;
	el = document.getElementById('home-list');

	for (i = 0; i < 3; i++) {
		li = document.createElement('li');
		li.innerText = 'New Home Item ' + (++generatedCount);
		el.insertBefore(li, el.childNodes[0]);
	}

	homeScroll.refresh();
}


function resetScroll(page) {
	setTimeout(function() {
		if (page == "home") {
			if (homeScroll !== null) {
				homeScroll.refresh();
			} else {
				homeScroll = new iScroll('home-scroller', {
					hideScrollbar: true,
					scrollbarClass: 'myScrollbar',
					useTransition: true,
					topOffset: pullDownOffset,
					onRefresh: function() {
						if (pullDownEl.className.match('loading')) {
							pullDownEl.className = '';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
						}
					},
					onScrollMove: function() {
						if (this.y > 5 && !pullDownEl.className.match('flip')) {
							pullDownEl.className = 'flip';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
							this.minScrollY = 0;
						} else if (this.y < 5 && pullDownEl.className.match('flip')) {
							pullDownEl.className = '';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
							this.minScrollY = -pullDownOffset;
						}
					},
					onScrollEnd: function() {
						if (pullDownEl.className.match('flip')) {
							pullDownEl.className = 'loading';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
							pullDownAction(); // Execute custom function (ajax call?)
						}
					}
				});
			}
		} else if (page == "news") {
			if (newsScroll !== null) {
				newsScroll.refresh();
			} else {
				newsScroll = new iScroll('news-scroller', {
					hideScrollbar: true,
					scrollbarClass: 'myScrollbar'
				});
			}
		} else if (page == "events") {
			if (eventsScroll !== null) {
				eventsScroll.refresh();
			} else {
				eventsScroll = new iScroll('events-scroller', {
					hideScrollbar: true,
					scrollbarClass: 'myScrollbar'
				});
			}
		} else if (page == "action") {
			if (actionScroll !== null) {
				actionScroll.refresh();
			} else {
				actionScroll = new iScroll('action-scroller', {
					hideScrollbar: true,
					scrollbarClass: 'myScrollbar'
				});
			}
		} else if (page == "bundles") {
			if (bundlesScroll !== null) {
				bundlesScroll.refresh();
			} else {
				bundlesScroll = new iScroll('bundles-scroller', {
					hideScrollbar: true,
					scrollbarClass: 'myScrollbar'
				});
			}
		} else {

		}
	}, 10);
}

function page(tabNum) {
	var toPage = $("#pages").find("[tabpanel='" + tabNum + "']");
	var fromPage = $("#pages .current");
	if (toPage.hasClass("current")) {
		return;
	} else if (toPage === fromPage) {
		//attempt to fix odd bug where nothing is current
		$("#pages div.page.current").removeClass("current");
		$("#pages div.page").css("display", "none"); //hide all
		toPage.addClass("current");
		toPage.css("display", "block");
		return;
	} else {

fromPage.removeClass("current");
$("#pages div.page").css("display", "none"); //hide all
toPage.show(0);
toPage.addClass("current");
console.log('showed new tab');
		
	}

}

function createModal(modalName) {
	var source = $("#modal-template").html();
	var template = Handlebars.compile(source);
	var data = modalName;
	var modal = template(data);
	$('#all-container').append(modal);
	resetSizing();
	resetPositioning();
	$('.modal-container#modal-' + modalName.PageID).css('top', (viewport.height + 40) + 'px');
	$('.modal-container#modal-' + modalName.PageID).css('display', 'block');
	$('.modal-container').removeClass("active");
	$('.modal-container#modal-' + modalName.PageID).addClass("active");
	$('.modal-container#modal-' + modalName.PageID).addClass("slid-up");
	$('.modal-container#modal-' + modalName.PageID).animate({
		top: "0px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 300, function() {

	});

}

function loadDetailView(template, content) {

	//PREPARE DETAIL VIEW
	var source = $("#" + template).html();
	var template = Handlebars.compile(source);
	var data = content;
	var detailview = template(data);
	
	//APPEND TO CONTAINER
	$('#detail-container').append(detailview);
	var viewToLoad = $('.detail-view#' + content.DetailID);

	//CHECK IF DETAIL CONTAINER IS ACTIVE AND SLIDE IN IF NOT
	if ($('#detail-container').hasClass('active')){
	slideInDetailView();
	}else{
	slideInDetailContainer();
	}
	
	function slideInDetailContainer(){
	
	//SHOW AND POSITION DETAIL CONTAINER AND VIEW
	$('#detail-container').css('display', 'block');
	$('#detail-container').css('left', viewport.panelwidth + 'px');
	$('.detail-view#' + content.DetailID).css('display', 'block');
	$('.detail-view#' + content.DetailID).css('left', '0px');
	resetSizing();
	
	//ADD FIRST CLASS TO DETAIL VIEW
	$('.detail-view#' + content.DetailID).addClass('first').addClass('active-dt');
	
	//SLIDE OUT TAB CONTAINER
	$('#tab-container').animate({
		left: -viewport.panelwidth + "px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 300, function() {
	
	});
	
	//SLIDE IN DETAIL CONTAINER
	$('#detail-container').animate({
		left: "0px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 260, function() {
	$('#detail-container').addClass('active');
	});
	
	}
	
	function slideInDetailView(){

	//SHOW AND POSITION DETAIL VIEW
	$('.detail-view#' + content.DetailID).css('display', 'block');
	$('.detail-view#' + content.DetailID).css('left', viewport.panelwidth + 'px');
	resetSizing();
	
	$('.detail-view.active-dt').animate({
		left: -viewport.panelwidth + "px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 300, function() {
	$('.detail-view.active-dt').removeClass('active-dt');
	$('.detail-view#' + content.DetailID).addClass('active-dt');
	});
	
	$('.detail-view#' + content.DetailID).animate({
		left: "0px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 260, function() {
	
	});
	}


}


//SLIDE FUNCTIONS
function slideStart(e) {
	if (e.originalEvent.touches) {
		e = e.originalEvent.touches[0];
	}
	if (sliding === 0) {
		sliding = 1;
		startClientX = e.clientX;
	}
}

function slide(e) {
	e.preventDefault();
	if (e.originalEvent.touches) {
		e = e.originalEvent.touches[0];
	}
	var deltaSlide = e.clientX - startClientX;

	if (sliding == 1 && deltaSlide !== 0) {
		sliding = 2;
	}

	if (sliding == 2) {
		if (deltaSlide < 0) {
			slideProfileClosed();
			sliding = 0;
		}

	}
}


//OPEN PROFILE

function slideProfileOpen() {
	updateProfile();
	$('#tab-container').animate({
		left: (viewport.panelwidth - 48) + "px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 260, function() {
		$('#profile-link').removeClass("unslid").addClass("slid");
		$('#tab-container').addClass("slid-right");
		$('#profile-closer').css("display", "block");
		$('#all-container').on('touchstart', '#profile-closer', slideStart);
		$('#all-container').on('touchmove', '#profile-closer', slide);
		resetSizing();
		resetPositioning();
	});
}

//CLOSE PROFILE

function slideProfileClosed() {

	var user = getUser();
	if (user !== null) {
		//$('#create-link').removeClass('hidden');
		//$('#about-link').addClass('hidden');
	} else {
		//$('#about-link').removeClass('hidden');
		//$('#create-link').addClass('hidden');
	}

	$('#tab-container').animate({
		left: "0px",
		useTranslate3d: true,
		leaveTransforms: false
	}, 260, function() {
		$('#tab-container').removeClass("slid-right");
		$('#profile-link').removeClass("slid").addClass("unslid");
		$('#all-container').off('touchstart', '#profile-closer', slideStart);
		$('#all-container').off('touchmove', '#profile-closer', slide);
		$('#profile-closer').css("display", "none");
		resetSizing();
		resetPositioning();
	});
}


//LOAD NEWS PAGE

function getNews(success, failed) {
	if ($('#news-list li').length === 0) {
        // Define the url which contains the full url
        // in this case, we'll connecting to http://example.com/api/rest/user/login
        var url = REST_PATH + 'news';
        
        // Use $.ajax to POST the new user
        $.ajax({
               type: "GET",
               url: url,
               dataType: "json",
               data: JSON.stringify(user),
               contentType: "application/json",
               // On success we pass the response as res
               success: function(result) {
               console.log(result);
               var source = $("#newsitem-template").html();
               var template = Handlebars.compile(source);
               var data = {
               nodes: result
               };
               var item = template(data);
               $('#news-list').append(item);
               success();
               },
               error: function(jqXHR, textStatus, errorThrown) {
               console.log('Error Occured ' + textStatus);
               failed();
               }
               });
        


	} else {
		success();
	}
}

function pageLoaded(pageName) {
			console.log('hiding preloader');
			hideLoader(pageName);
			resetSizing();
			console.log('resetting scroll');
			resetScroll(pageName);
}
function pageFailed(pageName) {
			hideLoader(pageName);
			resetSizing();
			resetScroll(pageName);
}

function getEvents(success, failed) {
	if ($('#events-list li').length === 0) {

		// Define the url which contains the full url
        // in this case, we'll connecting to http://example.com/api/rest/events
        var url = REST_PATH + 'events';
        
        // Use $.ajax to POST the new user
        $.ajax({
               type: "GET",
               url: url,
               dataType: "json",
               data: JSON.stringify(user),
               contentType: "application/json",
               // On success we pass the response as res
               success: function(result) {
               console.log(result);
               var source = $("#newsitem-template").html();
               var template = Handlebars.compile(source);
               var data = {
               nodes: result
               };
               var item = template(data);
               $('#events-list').append(item);
			   console.log('calling pageloaded');
               pageLoaded('events');
               },
               error: function(jqXHR, textStatus, errorThrown) {
               console.log('Error Occured ' + textStatus);
               pageFailed('events');
               }
            });
			
		
	} else {
	
		success();
		
	}
}

function getHome(success, failed) {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;

	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);

	if ($('#home-list li').length === 0) {
		
        
		// Define the url which contains the full url
        // in this case, we'll connecting to http://example.com/api/rest/user/petitions
        var url = REST_PATH + 'petitions';
        
        // Use $.ajax to POST the new user
        $.ajax({
               type: "GET",
               url: url,
               dataType: "json",
               data: JSON.stringify(user),
               contentType: "application/json",
               // On success we pass the response as res
               success: function(result) {
               console.log(result);
               var source = $("#newsitem-template").html();
               var template = Handlebars.compile(source);
               var data = {
               nodes: result
               };
               var item = template(data);
               $('#home-list').append(item);
               success();
               },
               error: function(jqXHR, textStatus, errorThrown) {
               console.log('Error Occured ' + textStatus);
               //failed();
               }
            });

			
	} else {
	
		success();
		
	}
}

function getAction() {
	resetSizing();
	resetScroll("action");
	setTimeout(function() {
		hideLoader("action");
		resetScroll("action");
	}, 1000);
	
}

function getBundles() {
	resetSizing();
	resetScroll("bundles");
	setTimeout(function() {
		hideLoader("bundles");
		resetScroll("bundles");
	}, 1000);
}



//DRUPAL STUFF

function successCallback() {
	console.log('success');
}

function nodeSuccessCallback(result) {
	var nodes = result.nodes;
	for (var i = 0; i < nodes.length; i++) {
		var html = "<li data-nid='" + nodes[i].nid + "'><img src='" + nodes[i].logo + "' />" + nodes[i].title + "</li>";
		$(html).appendTo('#home-items');
	}
	resetSizing();
}

function failureCallback() {
	console.log('failed');
}
function facebookUserLoggedIn(callback) {
    console.log('facebook user logged in');
    
    var fbUser = JSON.parse(window.localStorage["facebookUser"]);
    console.log(fbUser);
    
    if(fbUser != null) {
        loginUser(fbUser.id, '', function(result) {
                                console.log('drupal login complete');
                                
                                window.localStorage["user"] = JSON.stringify(result);
                                console.log('login success');
                                
                                }, function() {
                                console.log('login failed');
                                });
        callback();
    } else {
        callback();
    }
};

function facebookUserJoined(callback) {
    
    var fbUser = JSON.parse(window.localStorage["facebookUser"]);

    var userName = fbUser.id;
    var email = 'null-randomstring@localhost.com';
    var password = 'password';
    
    var user = {
    name: userName,
    mail: email,
    pass: password
    };
    
    if (window.plugins != undefined) {
        window.plugins.drupal.userSave(user, function() {
                                       alert('new user created');
                                       }, function() {
                                       alert('new user failed');
                                       });
    }
    callback();
};

var app = {
	// Application Constructor
initialize: function() {
    console.log('initialze app');
    
    this.bindEvents();
},
	// Bind Event Listeners
bindEvents: function() {
    console.log('bindEvents app');
    
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) || window.PhoneGap) {
        
        console.log('running in phonegap - not accurate yet');
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    } else if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        
        console.log('running in mobile browser');
        
        if (document.readyState === "complete") {
            this.onDeviceReady();
        } else {
            document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
        }
        
        
    } else {
        
        console.log('running in desktop browser');
        
        if (document.readyState === "complete") {
            this.onDeviceReady();
        } else {
            document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
        }
        
    }
    
},
	//DEVICE READY
onDeviceReady: function() {
    //SET VARS
    transitionEnd = whichTransitionEvent();
    viewport = {
    width: $(window).width(),
    height: $(window).height(),
    panelwidth: $('#all-container').width()
    };
    
    connect(function() {
            console.log('connected to drupal server success');
            }, function() {
            console.log('connection to drupal server failed');
            });
    
    //SET UP FUNCTIONS
    getHome(function() {
			hideLoader("home");
			resetSizing();
			resetScroll("home");
            }, function() {
            
			hideLoader("home");
			resetSizing();
			resetScroll("home");
    });
    
    resetSizing();
    resetScroll('home');
    new FastClick(document.body);
	
    // remove splash screen
    if (navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
    
    logoutUser(function() {}, function() {});
   
    
    //EVENT BINDINGS
    
    
    //RESIZE
    $(window).bind('resize', function() {
                   resetViewport();
                   resetSizing();
                   resetPositioning();
                   resetScroll();
                   });

		//SET UP FUNCTIONS
        getHome(function() {
			hideLoader("home");
			resetSizing();
			resetScroll("home");
            }, function() {
			hideLoader("home");
			resetSizing();
			resetScroll("home");
        });

        getEvents(pageLoaded('events'), pageFailed('events'));
    
        getNews(function() {
			hideLoader("news");
			resetSizing();
			resetScroll("news");
            }, function() {
			hideLoader("news");
			resetSizing();
			resetScroll("news");
            });
		
		// remove splash screen
		if (navigator.splashscreen) {
			navigator.splashscreen.hide();
		}

    console.log('here');



		//EVENT BINDINGS
		//RESIZE
		$(window).bind('resize', function() {
			resetViewport();
			resetSizing();
			resetPositioning();
			resetScroll();
		});


		//TAB BAR
		$('#tab-bar a').on('click', function(e) {
			e.preventDefault();
			var toTab = $(this).parent().attr("tab");
			var currentTab = $('#tab-bar a.current').parent().attr("tab");
			$('#tab-bar a.current').removeClass("current");
			$(this).addClass("current");
			$('#tab-bar li.current').removeClass("current");
			$(this).parent().addClass("current");

			page(toTab);
		});

		//NOT USED FOR THE MOMENT
		$("#tab-container").on('tab-change', function(e, data){
			if (data.tab == 1) {

			} else if (data.tab == 2) {

			} else if (data.tab == 3) {

			} else if (data.tab == 4) {

			} else if (data.tab == 5) {

			} else {

			}
		});
		
		//PAGE LOADING
		$("#tab-container").on('afterShow', '#news', function(e){
		if (($('#news-list li').length === 0)) {
				showLoader('news');
                               getNews(function() {
                                       hideLoader("news");
                                       resetSizing();
                                       resetScroll("news");
                                       }, function() {
                                       hideLoader("news");
                                       resetSizing();
                                       resetScroll("news");
                                       });
				}
		});
		$("#tab-container").on('afterShow', '#events', function(e){
		if (($('#events-list li').length === 0)) {
				showLoader('events');
                               getEvents(function() {
                                         hideLoader("events");
                                         resetSizing();
                                         resetScroll("events");
                                         }, function() {
                                         hideLoader("events");
                                         resetSizing();
                                         resetScroll("events");
                                         });
				}
		});
		$("#tab-container").on('afterShow', '#home', function(e){
		if (($('#home-list li').length === 0)) {
				showLoader('home');
                getHome(function() {
                                       hideLoader("home");
                                       resetSizing();
                                       resetScroll("home");
                                       }, function() {
                                       hideLoader("home");
                                       resetSizing();
                                       resetScroll("home");
                                       });
				}
		});
		$("#tab-container").on('afterShow', '#action', function(e){
				showLoader('action');
				getAction();
		});
		$("#tab-container").on('afterShow', '#bundles', function(e){
				showLoader('bundles');
				getBundles();
		});
		
		
		//PROFILE OPEN CLOSE
		$('#profile-closer').on('click', function(e) {
			e.preventDefault();
			slideProfileClosed();
		});

		$('#tab-container').on('click', '#profile-link.unslid', function(e) {
            console.log('profile open clicked');
            e.preventDefault();
			slideProfileOpen();
		});

		//MODALS
		$('#all-container').on('click', '.btn-about', function(e) {
			e.preventDefault();
			createModal(aboutModal);
		});
		$('#all-container').on('click', '.btn-create', function(e) {
			e.preventDefault();
			createModal(createSomethingModal);
		});
		$('#all-container').on('click', '#btn-create-account', function(e) {
			e.preventDefault();
			createModal(createAccountModal);
		});

		//CLOSE MODALS
		$('#all-container').on('click', '.modal-container.active .btn-modal-back', function(e) {
			e.preventDefault();
			$('.modal-container.active').removeClass("slid-up");
			$('.modal-container.active').animate({
				top: (viewport.height + 40) + 'px',
				useTranslate3d: true,
				leaveTransforms: false
			}, 300, function() {
				$('.modal-container.active').remove();
				$('#all-container .modal-container').last().addClass("active");
			});


		});

		
		//OPEN DETAILS
		$('#app-container').on('click', '.page ul li', function(e) {
		
		var temp = $(this).parent().attr('depth');
		depth = parseInt(temp);
		
		if (temp == undefined){
			loadDetailView('detail-template', testDetail);
			}else if (depth == 1){
			loadDetailView('detail-template', testDetail2);
			}else if (depth == 2){
			loadDetailView('detail-template', testDetail3);
			}else if(depth == 3){
			loadDetailView('detail-template', testDetail4);
			}else{
			alert('relax, friend...just testing here');
			}
		});
		
		//CLOSE DETAILS
		$('#app-container').on('click', '.detail-view.active-dt .btn-detail-back', function(e) {
			e.preventDefault();
			var depth = parseInt($('.detail-view.active-dt').attr('depth'));
			var nextBack = depth - 1;
			var loadUp = $('#detail-container').find("[depth='" + nextBack + "']");
			
			if(nextBack == 0){
			
			$('#tab-container').animate({
				left: "0px",
				useTranslate3d: true,
				leaveTransforms: false
			}, 260, function() {

			});

			$('#detail-container').animate({
				left: viewport.panelwidth + "px",
				useTranslate3d: true
			}, 400, function() {
				$('#detail-container').empty();
				$('#detail-container').removeClass('active');
			});

			
			}else{
			
			loadUp.css('left', -viewport.panelwidth + 'px');
			loadUp.css('opacity', '1');
			
			loadUp.animate({
				left: "0px",
				useTranslate3d: true,
				leaveTransforms: false
			}, 260, function() {

			});

			

			$('.detail-view.active-dt').animate({
				left: viewport.panelwidth + "px",
				useTranslate3d: true
			}, 400, function() {
				$('.detail-view.active-dt').remove();
				loadUp.addClass('active-dt');
			});

			}

		});
		
		
		
		

		//FIX AFTER FORM ENTRY
		$('#all-container').on('blur', 'input', function() {
			console.log('resetting');
			resetSizing();
			resetPositioning();
		});

        //FACEBOOK LOGIN
        $('#profile-container').on('click', '#fb-btn-signin', function(e) {
                                console.log('facebook button submit');
                                   
                                e.preventDefault();
                                promptLogin();
        });
		//SIGN IN SUBMIT
		$('#profile-container').on('click', '#signin-submit', function(e) {
                                   e.preventDefault();
                                   var userName = $("#signin-username").val();
                                   var password = $("#signin-password").val();
                                   
                                   loginUser(userName, password, function() {
                                             console.log('signin user complete');
                                             updateProfile();
                                             },
                                             function() {
                                             alert('Unable to login');
                                             });

		});
		//SIGN OUT SUBMIT
		$('#profile-container').on('click', '#signout-submit', function(e) {
			e.preventDefault();

            logoutUser(function() {
                                              console.log("signout complete");
                                              updateProfile();
                                              },
                                              function() {
                                              console.log("signout failed");
                                              updateProfile();
                                              });
		});
    
        //CONNECT WITH FACEBOOk
        $('#all-container').on('click', '#fb-btn-join', function(e) {
                               promptLogin(function() {
                                           
                                           console.log('facebook join complete');
                                           
                                           var fbUser = JSON.parse(window.localStorage["facebookUser"]);
                                           
                                           var userName = fbUser.id;
                                           var email = '';
                                           var password = '';
                                           
                                           var user = {
                                           name: userName,
                                           mail: userName,
                                           pass: password
                                           };
                                           
                                           if (window.plugins !== undefined) {
                                           window.plugins.drupal.userSave(user, function() {
                                                                          alert('new user created');
                                                                          }, function() {
                                                                          alert('new user failed');
                                                                          });
                                           }
                                           });
        });

		//CREATE ACCOUNT
    $('#all-container').on('click', '#create-account-submit', function(e) {
                           e.preventDefault();
                           
                           console.log('creating new user');
                           var userName = $("#join-username").val();
                           var password = $("#join-password").val();
                           var firstName = $("#join-first").val();
                           var lastName = $("#join-first").val();
                           var zipCode = $("#join-zip").val();
                           
                           createUser(userName, password, firstName, lastName, zipCode, function() {
                                      console.log('login user complete');
                                      
                                      updateProfile();
                                      }, function() {
                                      alert('Unable to Create Account');
                                      });
                           });



},
	//END DEVICE READY
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');
		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
		console.log('Received Event: ' + id);
	}
}; //END APP



//ANOTHER NEW SHOW BINDING
(function ($) {
    var _oldShow = $.fn.show;

    $.fn.show = function (/*speed, easing, callback*/) {
        var argsArray = Array.prototype.slice.call(arguments),
            duration = argsArray[0],
            easing,
            callback,
            callbackArgIndex;

        // jQuery recursively calls show sometimes; we shouldn't
        //  handle such situations. Pass it to original show method.
        if (!this.selector) {
            _oldShow.apply(this, argsArray);
            return this;
        }

        if (argsArray.length === 2) {
            if ($.isFunction(argsArray[1])) {
                callback = argsArray[1];
                callbackArgIndex = 1;
            } else {
                easing = argsArray[1];
            }
        } else if (argsArray.length === 3) {
            easing = argsArray[1];
            callback = argsArray[2];
            callbackArgIndex = 2;
        }

        return $(this).each(function () {
            var obj = $(this),
                oldCallback = callback,
                newCallback = function () {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(obj);
                    }

                    obj.trigger('afterShow');
                };

            if (callback) {
                argsArray[callbackArgIndex] = newCallback;
            } else {
                argsArray.push(newCallback);
            }

            obj.trigger('beforeShow');

            _oldShow.apply(obj, argsArray);
        });
    };
})(jQuery);