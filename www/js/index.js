//GLOBAL VARS
var viewport = {
width: $(window).width(),
height: $(window).height(),
panelwidth: $('#all-container').width()
};

var appui = {
footerHeight: 49,
headerHeight: 47
};

var myScroll = null;
var newsScroll = null;
var eventsScroll = null;
var homeScroll = null;
var actionScroll = null;
var bundlesScroll = null;
var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

var loader = $('<div class="loader"><p><span class="offset" /><span class="loader-image" /></span><span class="loader-message" /></span></span></div>');

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
PageContent: '<div class="fb-button"><button type="button" id="fb-btn-join" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="join-form"><form id="the-join-form" name="join-form"><div class="field-grouper"><input type="text" id="join-first" class="required" placeholder="First Name" name="FirstName"><input type="text" id="join-last" class="required" placeholder="Last Name" name="LastName"><input type="email" id="join-username" class="required" placeholder="Email Address" name="Email"><input type="password" id="join-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="create-account-submit" class="rb-btn red">Create Account</button></form></div><div id="main-body-sub-links"></div>'
};

var youContentAnon = {
ContentID: "you-content-anon",
PageContent: '<header><h1>Log In</h1></header><div id="profile" class="page anon"><div class="fb-button"><button type="button" id="fb-btn-signin" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><div class="field-grouper"><input type="email" id="signin-username" class="required" placeholder="Email Address" name="Email"><input type="password" id="signin-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="signin-submit" class="rb-btn red">Log In</button></div><br><div id="main-body-sub-links">Don\'t have an account? <a id="btn-create-account" href="#" data-ajax="false">Create One Now</a></p></div> <button type="button" id="logout_fb_button" class="button">Logout</button></div>'
};
var youContentAuth = {
ContentID: "you-content-auth",
PageContent: '<header><h1>You</h1></header><div id="profile" class="page auth"><div><button type="button" id="user-profile-button" class="rb-btn blue">Profile</button><button type="button" id="user-network-button" class="rb-btn blue">Network</button><button type="submit" id="user-actions-button" class="rb-btn blue">Actions</button><button type="submit" id="user-events-button" class="rb-btn blue">Events</button><button type="submit" id="user-bundles-button" class="rb-btn blue">Bundles</button><button type="button" id="signout-submit" class="rb-btn orange">Sign Out</button></div></div>'
};

var transitionEnd = 'webkitTransitionEnd';

var sliding = startClientX = startPixelOffset = pixelOffset = 0;

//GLOBAL FUNCTIONS

//SLIDING

function slideStart(event) {
    startClientX = startPixelOffset = pixelOffset = 0;
	if (event.originalEvent.touches) event = event.originalEvent.touches[0];
	if (sliding === 0) {
		sliding = 1;
		startClientX = event.clientX;
	}
}

function slide(event) {
	event.preventDefault();
	if (event.originalEvent.touches) {
		event = event.originalEvent.touches[0];
	}
    
    
    
	var deltaSlide = event.clientX - startClientX;
    
	if (sliding === 1 && deltaSlide !== 0) {
		sliding = 2;
		startPixelOffset = pixelOffset;
		$(document).on('touchend', slideEnd);
	}
    
	if (sliding == 2) {
        
		var touchPixelRatio = 1;
		var position = $("#tab-container").position();
		if ((position.left === 0 && event.clientX < startClientX)){
			touchPixelRatio = 5;
			$(document).off('touchend', slideEnd);
        }else if((position.left === (viewport.panelwidth - 48) && event.clientX > startClientX)) {
			touchPixelRatio = 5;
			pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            
			$('#temp').remove();
			$('<style id="temp">#tab-container{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
			$(document).off('touchend', slideEnd);
		}else{
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            
            $('#temp').remove();
            $('<style id="temp">#tab-container{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
        }
	}
}

function slideEnd(event) {
    
	$(document).off('touchend', slideEnd);
    
	if (sliding == 2) {
		sliding = 0;
		if (event.clientX > startClientX) {
			slideProfileOpen();
		} else {
			slideProfileClosed();
            
		}
	}
}



//USER FUNCTIONS
function getUser() {
	if (window.localStorage.length != 0 && window.localStorage['user'] != null) {
		var currentUser = JSON.parse(window.localStorage['user']);
		return currentUser;
	}
	return null;
}
function createUser(userName, password, success, failed) {
    var user = { name : userName,
        mail : userName,
        pass : password,
        signature : '<b>James R</b>',
        firstname : 'Sebastian'
        
    };
    
    window.plugins.drupal.userSave(user,  function(result) {
                                   console.log(result);
                                   
                                   window.localStorage["user"] = JSON.stringify(result);
                                   
                                   $('#profile.page').empty();
                                   var source = $("#html-content-template").html();
                                   var template = Handlebars.compile(source);
                                   var data = youContentAnon;
                                   var user = getUser();
                                   if (user !== null) {
                                   data = youContentAuth;
                                   }
                                   var content = template(data);
                                   $('#profile.page').append(content);
                                   success();
                                   }, function() {
                                   failed();
                                   });
    
}

function loginUser(userName, password, success, failed) {
    window.plugins.drupal.login(userName, password, function(result) {
                                window.localStorage["user"] = JSON.stringify(result);
                                
                                $('#profile.page').empty();
                                var source = $("#html-content-template").html();
                                var template = Handlebars.compile(source);
                                var data = youContentAnon;
                                var user = getUser();
                                if (user !== null) {
                                data = youContentAuth;
                                }
                                var content = template(data);
                                $('#profile.page').append(content);
                                success();
                                }, function() {
                                failed();
                                });
}
function logoutUser(success, failed) {
    
    window.plugins.drupal.logout(function() {
                                 window.localStorage.removeItem("user");
                                 $('#profile.page').empty();
                                 var source = $("#html-content-template").html();
                                 var template = Handlebars.compile(source);
                                 var data = youContentAnon;
                                 
                                 var content = template(data);
                                 $('#profile.page').append(content);
                                 console.log('user has been logged out');
                                 success();
                                 }, function() {
                                 window.localStorage.removeItem("user");
                                 console.log('logout failed');
                                 failed();
                                 });
}
// END USER FUNCTIONS

function updateProfile() {
    
	$('#profile-container').empty();
	var user = getUser();
	var source = $("#html-content-template").html();
	var template = Handlebars.compile(source);
	var data = youContentAnon;
	if (user !== null) {
		data = youContentAuth;
	}
	var content = template(data);
	$('#profile-container').append(content);
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
	$('#all-container').css('height', viewport.height + 'px');
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
	$('.page.current').prepend(loader);
	if (message) {
		$(".loader-message").text(message);
	} else {
		$(".loader-message").empty();
	}
	$('.loader').css('display', 'block');
}

function hideEmptyLoader() {
	$('.loader').fadeOut('fast', function() {
                         $('.loader').remove();
                         });
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
               }, 0);
}

function page(tabNum) {
	var toPage = $("#pages").find("[tabpanel='" + tabNum + "']");
	var	fromPage = $("#pages .current");
	if (toPage.hasClass("current")) {
		return;
	} else if (toPage === fromPage) {
		//attempt to fix odd bug where nothing is current
		$("#pages div.page.current").removeClass("current");
		$("#pages div.page").css("display", "none"); //hide all
		toPage.addClass("current");
		toPage.css("display", "block");
	} else {
		fromPage.removeClass("current");
		$("#pages div.page").css("display", "none"); //hide all
		toPage.addClass("current");
		toPage.css("display", "block");
	}
	if (tabNum == 3) {
		getHome();
        
	} else {
        
		if (tabNum == 1) {
			getNews();
		} else if (tabNum == 2) {
			getEvents();
		} else if (tabNum == 4) {
			getAction();
		} else if (tabNum == 5) {
			getBundles();
		} else {
            
		}
	}
    
}

function createModal(modalName) {
	var source = $("#modal-template").html();
	var template = Handlebars.compile(source);
	var data = modalName;
	var modal = template(data);
	$('#all-container').append(modal);
	resetSizing();
	$('.modal-container#modal-' + modalName.PageID).css('top', (viewport.height + 40) + 'px');
	$('.modal-container#modal-' + modalName.PageID).css('display', 'block');
	$('.modal-container').removeClass("active");
	$('.modal-container#modal-' + modalName.PageID).addClass("active");
	$('.modal-container#modal-' + modalName.PageID).addClass("slid-up");
	$('.modal-container#modal-' + modalName.PageID).animate({
                                                            top: "0px",
                                                            useTranslate3d: true,
                                                            leaveTransforms: false
                                                            }, 400, function() {
                                                            
                                                            });
    
}

//OPEN PROFILE

function slideProfileOpen() {
    
	updateProfile();
    
	$('#tab-container').animate({
                                left: (viewport.panelwidth - 48) + "px",
                                useTranslate3d: true,
                                leaveTransforms: false
                                }, 300, function() {
                                $('#temp').remove();
                                $('#profile-link').removeClass("unslid").addClass("slid");
                                $('#tab-container').addClass("slid-right");
                                $('#profile-closer').css("display", "block");
                                });
}
//CLOSE PROFILE

function slideProfileClosed() {
    
	var user = getUser();
	if (user !== null) {
		$('#create-link').removeClass('hidden');
		$('#about-link').addClass('hidden');
	} else {
		$('#about-link').removeClass('hidden');
		$('#create-link').addClass('hidden');
	}
    
	$('#tab-container').animate({
                                left: "0px",
                                useTranslate3d: true,
                                leaveTransforms: false
                                }, 200, function() {
                                $('#temp').remove();
                                $('#tab-container').removeClass("slid-right");
                                $('#profile-link').removeClass("slid").addClass("unslid");
                                $('#profile-closer').css("display", "none");
                                });
}


//LOAD NEWS PAGE

function getNews() {
    
	if (window.plugins !== undefined && ($('#news-list li').length === 0)) {
		showEmptyLoader("Getting News...");
		window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
		window.plugins.drupal.newsGetIndex(function(result) {
                                           
                                           var source = $("#newsitem-template").html();
                                           var template = Handlebars.compile(source);
                                           var data = {
                                           nodes: result
                                           };
                                           var item = template(result);
                                           $('.loader').remove();
                                           $('#news-list').append(item);
                                           resetSizing();
                                           resetScroll("news");
                                           }, failureCallback);
	} else {
		resetSizing();
		resetScroll("news");
	}
}

function getEvents() {
    
	if (window.plugins !== undefined && ($('#events-list li').length === 0)) {
		showEmptyLoader("Getting Events...");
		window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
		window.plugins.drupal.eventsGetIndex(function(result) {
                                             
                                             var source = $("#eventitem-template").html();
                                             var template = Handlebars.compile(source);
                                             var data = {
                                             nodes: result
                                             };
                                             var item = template(result);
                                             $('.loader').remove();
                                             $('#events-list').append(item);
                                             
                                             resetSizing();
                                             resetScroll("events");
                                             }, failureCallback);
	} else {
		resetSizing();
		resetScroll("events");
	}
}

function getHome() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
    
	document.addEventListener('touchmove', function(e) {
                              e.preventDefault();
                              }, false);
    
	if (window.plugins !== undefined && ($('#home-list li').length === 0)) {
		window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
		window.plugins.drupal.petitionsGetIndex(function(result) {
                                                $("#home-list").empty();
                                                
                                                var source = $("#homeitem-template").html();
                                                var template = Handlebars.compile(source);
                                                var data = {
                                                nodes: result
                                                };
                                                var item = template(result);
                                                $('.loader').remove();
                                                $('#home-list').append(item);
                                                
                                                resetSizing();
                                                resetScroll("home");
                                                
                                                }, failureCallback);
	} else {
		resetSizing();
		resetScroll("home");
	}
}

function getAction() {
	resetSizing();
	resetScroll("action");
}

function getBundles() {
	resetSizing();
	resetScroll("bundles");
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
function facebookUserLoggedIn() {
    var user = JSON.parse(window.localStorage["facebookUser"]);


    window.plugins.drupal.login(user.id, '12341234', function(result) {
                                window.localStorage["user"] = JSON.stringify(result);
                                console.log('login success');
                                updateProfile();
                                
                                }, function() {
                                alert('login failed');
                                });
};

function facebookUserJoined() {
    var userName = user.id;
    var email = 'james100@paidthx.com';
    var password = '12341234';
    
    console.log(userName);
    console.log(password);
    
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
    
    //SET UP FUNCTIONS
    getHome();
    resetSizing();
    resetScroll('home');
    
    // remove splash screen
    if (navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
    
    window.localStorage.removeItem("user");
    
    //check if logged in
    var user = getUser();
    if (user !== null) {
        $('#create-link').removeClass('hidden');
        $('#about-link').addClass('hidden');
    }
    
    //SETUP FACEBOOK PLUGIN
    FB.init({
            appId: 'appid',
            nativeInterface: CDV.FB,
            useCachedDialogs: false
            });
    
    //FB.getLoginStatus(handleStatusChange);
    
    //authUser();
    //updateAuthElements();
    
    //EVENT BINDINGS
    
    
    //RESIZE
    $(window).bind('resize', function() {
                   resetViewport();
                   resetSizing();
                   resetPositioning();
                   resetScroll();
                   });

    
    
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
    
    $('#profile-closer').on('click', function(e) {
                            e.preventDefault();
                            slideProfileClosed();
                            });
    $('#profile-closer').swipe( {
                               click:function(event, target){
                               slideProfileClosed();	
                               },
                               swipeLeft:function(event, direction, distance, duration, fingerCount) {
                               slideProfileClosed();	
                               },
                               triggerOnTouchEnd:false,
                               threshold:5
                               });
    
    $('#tab-container').on('click', '#profile-link.unslid', function(e) {
                           e.preventDefault();
                           slideProfileOpen();
                           });
    $('.btn-about').on('click', function(e) {
                       e.preventDefault();
                       createModal(aboutModal);
                       });
    $('.btn-create').on('click', function(e) {
                        e.preventDefault();
                        createModal(createSomethingModal);
                        });
    $('#all-container').on('click', '.modal-container.active .btn-modal-back', function(e) {
                           e.preventDefault();
                           $('.modal-container.active').removeClass("slid-up");
                           $('.modal-container.active').animate({
                                                                top: (viewport.height + 40) + 'px',
                                                                useTranslate3d: true,
                                                                leaveTransforms: false
                                                                }, 400, function() {
                                                                $('.modal-container.active').remove();
                                                                $('#all-container .modal-container').last().addClass("active");
                                                                });
                           
                           
                           });
    $('#all-container').on('click', '#btn-create-account', function(e) {
                           e.preventDefault();
                           createModal(createAccountModal);
                           });
    
    $('#all-container').on('blur', 'input', function() {
                           console.log('resetting');
                           resetPositioning();
                           });
    
    //DEBUG
    $('div.page ul li').on('click', function(e) {
                           alert('SHOW DETAILS');
                           });
    //FACEBOOK CONNECT
    $('#profile-container').on('click', '#fb-btn-signin', function(e) {
                               promptLogin(handleStatusChange);
    });
    $('#all-container').on('click', '#logout_fb_button', function(e) {
                               alert('fb logout');
                               logout();
                               });
    //SIGN IN SUBMIT
    $('#profile-container').on('click', '#signin-submit', function(e) {
                               e.preventDefault();
                               var userName = $("#signin-username").val();
                               var password = $("#signin-password").val();
                               
                               if (window.plugins != undefined) {
                               window.plugins.drupal.logout(function() {
                                                            console.log('user logout success');
                                                            }, function() {
                                                            console.log('user logout failed');
                                                            });
                               
                               window.plugins.drupal.login(userName, password, function(result) {
                                                           window.localStorage["user"] = JSON.stringify(result);
                                                           console.log('login success');
                                                           updateProfile();
                                                           
                                                           }, function() {
                                                           alert('login failed');
                                                           });
                               }
                               });
    //SIGN OUT SUBMIT
    $('#profile-container').on('click', '#signout-submit', function(e) {
                               e.preventDefault();
                               
                               if (window.plugins != undefined) {
                               window.plugins.drupal.logout(function(result) {
                                                            window.localStorage.removeItem("user");
                                                            updateProfile();
                                                            console.log('logout success');
                                                            }, function(result) {
                                                            console.log('logout failed');
                                                            });
                               }
                               });
    
    //CREATE ACCOUNT
    $('#all-container').on('click', '#create-account-submit', function(e) {
                           e.preventDefault();
                           var userName = $('#join-username').val();
                           var password = $('#join-password').val();
                           console.log(userName);
                           console.log(password);
                           
                           var user = {
                           name: userName,
                           mail: userName,
                           pass: password
                           };
                           
                           if (window.plugins != undefined) {
                           window.plugins.drupal.userSave(user, function() {
                                                          alert('new user created');
                                                          }, function() {
                                                          alert('new user failed');
                                                          });
                           }
                           
                           });
    //FACEBOOK CONNECT CREATE ACCOUNT
    $('#all-container').on('click', '#fb-btn-join', function(e) {
                           promptLogin();
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


jQuery(function($) {
       
       var _oldShow = $.fn.show;
       
       $.fn.show = function(speed, oldCallback) {
       return $(this).each(function() {
                           var
                           obj = $(this),
                           newCallback = function() {
                           if ($.isFunction(oldCallback)) {
                           oldCallback.apply(obj);
                           }
                           
                           obj.trigger('afterShow');
                           };
                           
                           // you can trigger a before show if you want
                           obj.trigger('beforeShow');
                           
                           // now use the old function to show the element passing the new callback
                           _oldShow.apply(obj, [speed, newCallback]);
                           });
       };
});