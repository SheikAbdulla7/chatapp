
const socket = io('http://127.0.0.1:80');


function joinRoom(data){
    socket.emit('connection_details', data);
    console.log("joined");

}
const sendMessage = (message) => {
    var output=`<div class="row message-body">
          <div class="col-sm-12 message-main-sender">
            <div class="sender">
              <div class="message-text">
               ${message.msg}
              </div>
              <span class="message-time pull-right">
                Sun
              </span>
            </div>
          </div>
        </div>`
        $('.conversation .msg').append($.parseHTML(output))
        $("#conversation").animate({ scrollTop: $("#conversation").prop("scrollHeight") - $("#conversation").height()  }, 500);
        console.log("sender of this message is " + message.sender);
        $.ajax({
          headers: {
              "X-CSRFToken": csrftoken
          },
          url : '/addmessage/',
          method: 'POST',
          data: {'sender' : message.sender, 'room' : message.room_id, 'message' : message.msg},
          datatype: 'json',
          success : function(data){
            console.log(data.success);
          }
        })       
        socket.emit('send_message', message.msg);
}
socket.on('display_message', msg => {
    var output = `<div class="row message-body">
      <div class="col-sm-12 message-main-receiver">
        <div class="receiver">
          <div class="message-text">
            ${msg}
          </div>
          <span class="message-time pull-right">
            Sun
          </span>
        </div>
      </div>
    </div>`
    $('.conversation .msg').append($.parseHTML(output))
    $("#conversation").animate({ scrollTop: $("#conversation").prop("scrollHeight") - $("#conversation").height()  }, 500);
    console.log("meszsage from sender "+ msg);
})
