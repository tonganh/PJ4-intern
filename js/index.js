function makeRequest() {
  return new Promise(async (resolove) => {
    const res =
        await axios.get('https://5d69d9fd6b97ef00145b7643.mockapi.io/api/users')
            .then((res) => {
              for (i of res.data) {
                $('<tr><td id="users-id">' + i.id + '</td><td>' + i.name +
                  '</td><td>' + i.email + '</td><td>' + i.phone + '</td><td>' +
                  '<i id="edit" data-id="' + i.id +
                  '" class="fas fa-user-edit"></i><i id="delete" data-id="' +
                  i.id + '" class="fas fa-user-times"></i>' +
                  '</td></tr>')
                    .appendTo('tbody');
              }
            });
  });
}
makeRequest();
function sendRequest(name, email, phone) {}
function deleteData(position) {
  axios.delete(
      'https://5d69d9fd6b97ef00145b7643.mockapi.io/api/users/' + position + '');
}
$(document).ready(function() {
  $(document).on('click', '#delete', function() {
    var action = confirm('Are You Sure Want To Delete that?');
    if (action != false) {
      var value = $(this).data('id');
      deleteData(value);
      $(this).parents('tr').remove();
      $(this).parents('tr').css('display:none');
    }
  });
  $('#submit-add').click(function() {
    var nameadd = $('#name-add').val();
    var email = $('#email-add').val();
    var phone = $('#phone-add').val();
    axios
        .post('https://5d69d9fd6b97ef00145b7643.mockapi.io/api/users', {
          name: nameadd,
          email: email,
          phone: phone,
        })
        .then(() => {
          window.history.back();
        });
  });
  $(document).on('click', '#edit', function() {
    var value = $(this).data('id');
    $(location).attr('href', '/edit.html?id=' + value);
  })
  $('#submit-edit').click(function() {
    var nameedit = $('#name-edit').val();
    var email = $('#email-edit').val();
    var phone = $('#phone-edit').val();
    var id = window.location.search;
    id = id.slice(4);
    console.log(id);
    axios
        .put('https://5d69d9fd6b97ef00145b7643.mockapi.io/api/users/' + id, {
          name: nameedit,
          email: email,
          phone: phone,
        })
        .then(() => {
          $(location).attr('href', '/index.html');
        })
  });
});
