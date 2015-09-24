var accessToken = 'd707d5e66a124958ae6667c5e03d554d';
var user = "";
var userid = "";
var followers = "";

$(document).ready(function () {
$('.form').submit(function (event) {
    $('.results').empty();
    var user = $(this).find("input[name='userEntry']").val();
    console.log(user);
    $('.instructions').css("display", "none");
    $('.container').css("display", "block");
    $.ajax({
        url: 'https://api.instagram.com/v1/users/search?q=' + user,
        dataType: 'jsonp',
        type: 'GET',
        data: {
            client_id: accessToken
        },
        success: function (result) {
            var userid = (result.data[0].id);
            console.log(userid);
            $.ajax({
                url: 'https://api.instagram.com/v1/users/' + userid + '/followed-by',
                dataType: 'jsonp',
                type: 'GET',
                data: {
                    client_id: accessToken
                },
                success: function (followerslist) {
                    //console.log(result.data);
                    var followers = (followerslist.data);
                    for (var i = 0; i < followers.length; i++) {
                        console.log(followers[i].full_name);
                        $('.results').append("<li>" + "<img src='" + followers[i].profile_picture + "'>" + "<div class='info'><p>" + user + " is being followed by <b>" + followers[i].full_name + "</b>, a.k.a. <b>" + followers[i].username + "</b></p></div></li>");
                    };
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
});
});