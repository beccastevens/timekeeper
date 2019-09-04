var app = new Vue({
  el: '#timeSheet',
  data: {
    entries: [],
    newDate: '',
    newDesc: '',
    newStart: '',
    newEnd: '',
    newHours: 0,
    error: false,
    dateError: false
  },
  mounted: function () {
    this.getEntries();
  },
  methods: {
    addNew: function(){
      if(!this.newDate || !this.newDesc || !this.newHours) {
        this.error = true;
      } else {
        let formData = new FormData();
        formData.append('entry_date', stringDate);
        formData.append('description', this.newDesc);
        formData.append('start_time', stringStart);
        formData.append('end_time', stringEnd);
        formData.append('hours', this.newHours);

        var newEntry = {};
        formData.forEach(function(value, key){
          newEntry[key] = value;
        });

        axios({
          method: 'post',
          url: 'api/entries.php',
          data: {
            formData: newEntry,
            request: 1
          },
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
          //handle success
          console.log(response);
          app.entries.push(newEntry);
          app.resetForm();
        })
        .catch(function (response) {
          //handle error
          this.error = true;
          console.log(response);
        });
      }
    },
    resetForm: function() {
      this.newDate = '';
      this.newDesc = '';
      this.newStart = '';
      this.newEnd = '';
      this.newHours = '';
      this.error = false;
    },
    parseDateTime: function(){
      var date = moment(this.newDate);
      stringDate = date.format('YYYY-MM-DD');

      var start = moment(stringDate + ' ' + this.newStart);
      stringStart = start.format('HH:mm');

      var end = moment(stringDate + ' ' + this.newEnd);
      stringEnd = end.format('HH:mm');

      if( date.isValid() && start.isValid() && end.isValid() ) {
        var hours = end.diff(start, 'hours', true);
        this.dateError = false;

        if(hours > 0) {
          this.newHours = hours;
          this.dateError = false;
        } else if(hours < 0 && this.newEnd.length > 0) {
          this.newHours = '';
          this.dateError = 'Start time must be earlier than end time';
        } else {
          this.newHours = '';
          this.dataError = false;
        }
      } else {
        if(!date.isValid()) {
          this.dateError = 'Date format is unrecognized';
        } else if(!start.isValid()) {
          this.dateError = 'Start time not recognized';
        } else if(!end.isValid()) {
          this.dateError = 'End time is not recognized';
        } else {
          this.dateError = 'Unknown error, please clear form and try again';
        }
      }
    },
    deleteEntry: function(index) {
      if (confirm('Are you sure you want to delete this entry?')) {
          // console.log(app.entries[index].id);
          axios({
            method: 'post',
            url: 'api/entries.php',
            data: {
              id: app.entries[index].id,
              request: 2
            }
          })
          .then(function (response) {
            //handle success
            // console.log(response);
            app.entries.splice(index,1);
          })
          .catch(function (response) {
            //handle error
            this.error = true;
            console.log(response);
          });
      } else {
          // Do nothing!
      }
    },
    displayDate: function(date){
      var displayDate = moment(date).format('MMM D, YYYY');
      return displayDate;
    },
    displayTime : function(datetime) {
      var displayTime = moment(datetime).format('h:mm a');
      return displayTime;
    },
    getEntries: function(){
      axios.get('api/entries.php')
      .then(function (response) {
          app.entries = response.data;
          console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  },
  computed: {
    totalHours: function(){
      var total = 0;
      this.entries.forEach((time) => {
        total += parseFloat(time.hours);
      });
      return total;
    }
  }
});
