---
layout: about-single
title: Slack
slug:
    - label: community
      url: /about/community/
    - slack
redirect_from:
  - /slack/
---


To get an invite to the Node-RED Slack, enter your email below.

Make sure you've read our [guidelines](/about/community) first.

<div class="slack">
    <div class="slackform">
        <p><input id="e" placeholder="Email"> <input type="submit" id="go" value="Get invite"></p>
        <p class="slackerr"></p>
    </div>
    <div class='slackmsg hide'>
        <p>Check your email for an invitation</p>
    </div>
</div>

Already a member? <a href="https://node-red.slack.com">Click here</a> to join the conversation

<script>
    $('#go').click(function() {
        $('.slackerr').text();
        $('#go').attr('disabled',true);
        $.ajax({
            type: "POST",
            url: 'https://gnh34zyze1.execute-api.eu-west-2.amazonaws.com/default/nodeREDSlackInviter',
            data: {email:$('#e').val()},
            success: function(data,status) {
                $('#go').attr('disabled',false);
                if (!data.ok) {
                    if (data.error === 'invalid_email') {
                        $('.slackerr').text('Not a valid email address');
                    } else if (data.error === 'already_invited') {
                        $('.slackerr').text('Email address already invited');
                    } else if (data.error === 'already_in_team') {
                        $('.slackerr').text('Email address already in the team');
                    } else {
                        $('.slackerr').text('Something unexpected happened: '+data.error);
                    }
                    console.log(data);
                } else {
                    $('#e').val('')
                    $('.slackmsg').show();
                }
            }
        });
    })
</script>

<style>
    .slack input {
        border: 1px solid #999;
        background: #fff;
        color: #666;
        padding: 8px 16px;
        font-size: 20px;
    }
    .slack #e {
        width: 370px;
    }
    .slack #go {
        cursor: pointer;
    }
    .slackerr {
        margin-top: 0;
        font-size: 16px;
        color: #f66;
    }

</style>
