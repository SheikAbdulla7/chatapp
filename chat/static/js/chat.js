function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue; 
}
const csrftoken = getCookie('csrftoken');
$(function(){
    $(".heading-compose").click(function() {
      $(".side-two").css({
        "left": "0"
      });
    });

    $(".newMessage-back").click(function() {
      $(".side-two").css({
        "left": "-100%"
      });
    });
})

$(document).ready(function(){
    $("#composeText").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".compose-sideBar .sideBar-body").filter(function() {
          //$(this).css("display", "block");
          /*if(value === ""){
            $(this).css("display", "block");
          }*/
        $(this).toggle($(this).find(".sideBar-main .row .sideBar-name .name-meta").text().toLowerCase().indexOf(value) > -1);
        });
    });
});

$(document).ready(function() {
    $(document).on('click', '.sideBar-add .add', function(){
        var participantid = $(this).parent().prev().children('input').val();
        console.log(participantid);
        $.ajax({
            headers: {
                "X-CSRFToken": csrftoken
            },
            url : '/addparticipant/',
            method : 'POST',
            data : {'participant':participantid},
            datatype : 'json',
            success : function(data){
                console.log(data.success);
                console.log(data.connected_room)
                console.log(data.all_logged_user);
                $Util.displayAllUser(data.all_logged_user, data.profiles);
                $(".side-two").css({
                    "left": "-100%"
                });
                $Util.displayConnectedUser(data.connected_room, data.profiles);
            }
        })
    })
})

// rofile generator
$(document).ready(function(){
    const profile_generator = function (element, name){
        //var firstName = $('#firstName').text();
        var intials = name.charAt(0);
        console.log(intials);
        console.log(element);
        $(element).text(intials);
    }
 
});
$(document).ready(function(){
    $(document).on('click', '.side-one .sideBar .sideBar-body', function(){
        $('.sideBar-body.active').removeClass('active');
        $(this).toggleClass('active');
        $(".empty").css({
            "display": "none"
        })
        $(".conversation").css({
            "display": "block"
        })
        $('.side').toggleClass('media-side');
        console.log('clicked');
        var connectionDetails = new Object();
        connectionDetails['room_id'] = $(this).find('#connectRoomId').val();
        connectionDetails['my_id'] = $('.heading').find('#myId').val();
        connectionDetails['recipient_id'] = $(this).find('#connectUserId').val();
        $.ajax({
            url : '/getmessage/',
            method : 'GET',
            data : {'roomid':connectionDetails['room_id'], 'recipientid':connectionDetails['recipient_id']},
            datatype : 'json',
            success : function(data){
                console.log(data.messages);

                $Util.displayAllMessage(data.messages, data.profile, $('.heading').find('#myId').val());
            }
        })
        $(this).find('span.meta-name').text()
        $('.heading .heading-name .heading-name-meta').text($(this).find('span.name-meta').text());
        $('.heading .heading-name #connectUserId').val($(this).find('input#connectUserId').val());
        $('.heading .heading-name #connectRoomId').val($(this).find('input#connectRoomId').val());
        $("#conversation").animate({ scrollTop: $("#conversation").prop("scrollHeight") - $("#conversation").height() + 600}, 500);
        console.log(connectionDetails);
        joinRoom(connectionDetails);  
    })
})

$(document).ready(function(){
    $(document).on('click', '.reply .reply-send', function(){
        console.log('clicked');
        console.log(this);
        var msg = $(this).siblings('.reply-main').find('textarea').val();
        var message = new Object();
        message['sender'] = $('.side-one .heading').find('input#myId').val();
        message['room_id'] = $('.heading').find('input#connectRoomId').val();
        message['msg'] = msg;
        console.log(msg);
        if(msg != ''){
            console.log('enabled');
            sendMessage(message);
        }
        $(this).find('textarea').val('');
    })
})
$(document).ready(function(){
    $(document).on('keypress', '.reply .reply-main', function(e){
        if(e.which == 13){
            e.preventDefault();
            var msg = $(this).find('textarea').val();
            var message = new Object();
            message['sender'] = $('.side-one .heading').find('input#myId').val();
            message['room_id'] = $('.heading').find('input#connectRoomId').val();
            message['msg'] = msg;
            sendMessage(message);
            $(this).find('textarea').val('');
        }
    })
})

// $(document).ready(function(){
//     $('[data-bs-toggle="popover"]').popover();   
// }); 

$(document).ready(function(){
    $(document).on('click', '.conversation .heading .back-arrow', function(){
        $('.side').removeClass('media-side');
    })
})
