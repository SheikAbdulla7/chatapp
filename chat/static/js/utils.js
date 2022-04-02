var $Util = function(){
		return{
			displayAllUser : function(x, y){
				var output=""
				for(var i=0; i<x.length; i++){
					for(var j=0; j<y.length; j++){
						if(x[i].id == y[j].user__id){
							output+=`<div class="row sideBar-body">
		                    <div class="col-sm-3 col-xs-3 sideBar-avatar">
		                        <div class="avatar-icon" id="profileImage" style="background:${y[j].color};">
		                            <!--<img src="https://bootdey.com/img/Content/avatar/avatar1.png">-->
		                            ${y[j].nick}
		                        </div>

		                    </div>
		                    <div class="col-sm-9 col-xs-9 sideBar-main">
		                        <div class="row">
		                            <div class="col-sm-8 col-xs-8 sideBar-name">
		                                <span class="name-meta">${x[i].username}
		                                </span>
		                                <input type="hidden" id="custId" name="custId" value="${x[i].id}">
		                            </div>

		                            <div class="col-sm-4 col-xs-4 pull-right sideBar-add" style="text-align: center;">
		                                <!--<span class="time-meta pull-right">18:18-->
		                                <button class="btn btn-primary add">Add</button>
		                                <!--</span>-->
		                            </div>
		                        </div>
		                    </div>
		                </div>`
						}
					}
				}
				$('.side-two .compose-sideBar').html($.parseHTML(output));
			},
			displayConnectedUser : function(x, y){
				var output="";
				for(var i=0; i<x.length;i++){
					for(var j=0; j<y.length; j++){
						if(x[i].user__id == y[j].user__id){
							output+=`<div class="row sideBar-body">
				            <div class="col-sm-3 col-xs-3 sideBar-avatar">
				              <div class="avatar-icon" id="profileImage" style="background:${y[j].color};">
				                <!--<img src="https://bootdey.com/img/Content/avatar/avatar1.png">-->
				                ${y[j].nick}
				              </div>
				            </div>
				            <div class="col-sm-9 col-xs-9 sideBar-main">
				              <div class="row">
				                <div class="col-sm-8 col-xs-8 sideBar-name">
				                  <span class="name-meta">${x[i].user__username}
				                  </span>
				                  <input type="hidden" id="connectUserId" name="connectUserId" value="${x[i].user__id}">
				                  <input type="hidden" id="connectRoomId" name="connectRoomId" value="${x[i].room__roomid}">
				                </div>
				                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
				                  <span class="time-meta pull-right">18:18
				                  </span>
				                  
				                </div>
				              </div>
				            </div>
				          </div>`
						}
					}
					
				}
				$('.side-one .sideBar').html($.parseHTML(output));
			},
			displayAllMessage : function(x, y, me){
				var output="";
				var date = "";
				var title = "";
				function tConvert (time) {
				  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

				  if (time.length > 1) { 
				    time = time.slice (1); 
				    time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
				    time[0] = +time[0] % 12 || 12; 
				  }
				  return time.join (''); 
				}
				title += `<div class="heading-avatar-icon" id="profileImage" style="background:${y[0].color}; width:40px; height:40px; line-height: 40px;">
						${y[0].nick}
          				</div>`

          		console.log($('.conversation .heading .heading-avatar').html($.parseHTML(title)));
				//tConvert ('18:00:00');
				for (var i = 0; i<x.length; i++) {
					if(x[i].date != date){
						date = x[i].date
						let formated_date = date.slice(8,10) + '/' + date.slice(5,7) + '/' + date.slice(0,4);
						output+=`<div style="text-align: center; margin-top: 15px; margin-bottom: 15px;">
			            <span style="padding: 6px 16px; background-color: #d7eefa; border-radius: 6px;">${formated_date}</span>
			          </div>`
					}
					if(x[i].user__id == me){
						output += `<div class="row message-body">
			            <div class="col-sm-12 message-main-sender">
			              <div class="sender">
			                <div class="message-text">
			                  ${x[i].message}
			                </div>
			                <span class="message-time pull-right">
			                  ${tConvert (x[i].time.slice(0,5))}
			                </span>
			              </div>
			            </div>
			          </div>`
					}
					else{
						output+=`<div class="row message-body">
			            <div class="col-sm-12 message-main-receiver">
			              <div class="receiver">
			                <div class="message-text">
			                 ${x[i].message}
			                </div>
			                <span class="message-time pull-right">
			                  ${tConvert (x[i].time.slice(0,5))}
			                </span>
			              </div>
			            </div>
			          </div>`
					}

				}
				$('#conversation .msg').html($.parseHTML(output));
			}
		}
}();