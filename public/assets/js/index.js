$(function() {
    Wstoast.config({autoClose:true,showClose:true,html:true})
    // API FIND INFO FACEBOOK
    $('#FindInfoFacebook').click(function(event) {
        event.preventDefault();
        Wstoast.loading("Đợi trong giây lát...");
        $('.loader').show();
        var btn=$(this);
        btn.prop('disabled', true);
        btn.html('<i class="fa fa-spinner fa-spin"></i>&ensp;Đang Xử Lý');
        var input=decodeURIComponent($('#uid').val().trim());
        if(input.trim() === '') {
            $('.loader').hide();
            Wstoast.closeAll();
            btn.prop('disabled', false);
            btn.html('<i class="fa fa-check"></i>&ensp;Xác Nhận');
            Wstoast.error("Vui lòng nhập Link hoặc Uid Facebook!");
            return;
        }
        $.ajax({
            url: 'https://wusteam.com/api/find-info-facebook', // thay api riêng của bạn
            type: 'GET',
            data: {FindInfoFacebook:true,input:input}, // chỉnh tham số theo api của bạn
            dataType: 'json',
            success: function(data) {
                Wstoast.closeAll();
                $('.loader').hide();
                btn.prop('disabled', false);
                btn.html('<i class="fa fa-check"></i>&ensp;Xác Nhận');
                var __null=0;
                if (data.facebook === null) __null++;
                if (data.data.idtk === null) __null++;
                if (data.data.datecreate === null) __null++;
                if (data.data.user === null) __null++;
                if (data.data.link === null) __null++;
                if (data.data.name === null) __null++;
                if (data.data.locale === null) __null++;
                if (data.data.location === null) __null++;
                if (data.data.website === null) __null++;
                if (data.data.birthday === null) __null++;
                if (data.data.gender === null) __null++;
                if (data.data.relationship === null) __null++;
                if (data.data.follow === null) __null++;
                if (__null >= 10) {
                  Wstoast.error("Token facebook is Died!");
                } else {
                    var facebook = '<table>';
                    facebook += '<tr><td class="query-title">ID:</td><td>' + (data.data.idtk || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Họ Tên:</td><td>' + (data.data.name || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Ngày Tạo:</td><td>' + (data.data.datecreate || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Theo Dõi:</td><td>' + (data.data.follow || 'Không xác định') + ' người theo dõi</td></tr>\n';
                    facebook += '<tr><td class="query-title">Tình Trạng:</td><td>' + (data.data.relationship || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Sinh Nhật:</td><td>' + (data.data.birthday || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Giới Tính:</td><td>' + (data.data.gender || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Username:</td><td>' + (data.data.user || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Url Facebook:</td><td><a href="' + (data.data.link || '#') + '">' + (data.data.link || 'Không xác định') + '</a></td></tr>\n';
                    facebook += '<tr><td class="query-title">Quốc Gia:</td><td>' + (data.data.locale || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Nơi Sống:</td><td>' + (data.data.location || 'Không xác định') + '</td></tr>\n';
                    facebook += '<tr><td class="query-title">Website:</td><td>' + (data.data.website || 'Không xác định') + '</td></tr>';                    
                    facebook += '</table>';
                    $(".hide-result").show();
                    $(".result").html(facebook);
                }
            },            
            error: function(xhr, textStatus, errorThrown){
                $('.loader').hide();
                Wstoast.closeAll();
                btn.prop('disabled', false);
                btn.html('<i class="fa fa-check"></i>&ensp;Xác Nhận');
                Wstoast.error('Lỗi không thể kết nối đến server!');
            }
        });
    });
});