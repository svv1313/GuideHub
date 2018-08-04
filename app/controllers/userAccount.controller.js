(function(){
    'use strict';

    app.controller('UserAccount', ['$scope', 'account.repository', function($scope, accountRepository){

        if (localStorage.getItem("userId")) {
            accountRepository.getUserData(localStorage.getItem("userId")).then(function(response) {
               
                if (response.data.firstname) {
                    $scope.userName = response.data.firstname;
                } else {
                    $scope.userName = "Введите ваше имя";
                }

                if (response.data.photo) {
                    $scope.userPhoto = response.data.photo;
                } else {
                    $scope.userPhoto = "./image/unknown.png";
                }


            }, function(error) {});
        }


    	$scope.check = "trip";
        $scope.userNameClick = true;
        $scope.tripName = "Название";
        $scope.tripNameClick = true;

        // User's photo 
        $scope.changePhoto = function() {
            var input, file, fr, img, result;

            input = document.getElementById("userPhoto");
            
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);

            function createImage() {
                img = new Image();
                // img = $scope.userPhoto;
                img.onload = imageLoaded;
                img.src = fr.result;
                console.log(fr.result);
                result = fr.result;
            }

            function imageLoaded() {
                var canvas = document.getElementById("canvas")
                canvas.width = 220;
                canvas.height = 265;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
                // alert(canvas.toDataURL("image/png"));
            }

            // function write(msg) {
            //     var p = document.createElement('p');
            //     p.innerHTML = msg;
            //     document.body.appendChild(p);
            // }
            console.log(result);
            var obj = {"photo": "gjhjghj"};
            accountRepository.editUserData(localStorage.getItem("userId"), obj).then(function(response) {
                console.log(response);
            }, function(error) {});
        };

        // _____________________________


        $scope.gallery = [
            {src: './image/users-photos/image-1.png', desc: 'Image 01'},
            {src: './image/users-photos/image-2.png', desc: 'Image 02'},
            {src: './image/users-photos/image-3.png', desc: 'Image 03'},
            {src: './image/users-photos/image-4.png', desc: 'Image 04'},
            {src: './image/users-photos/image-5.png', desc: 'Image 05'},
            {src: './image/users-photos/image-6.png', desc: 'Image 06'},
            {src: './image/users-photos/image-7.png', desc: 'Image 07'}
        ];

        $scope._Index = 0;

        $scope.isActive = function(index) {
            return $scope._Index === index;
        };

        $scope.showPrev = function() {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.gallery.length - 1; 
        };

        $scope.showNext = function() {
            $scope._Index = ($scope._Index < $scope.gallery.length - 1) ? ++$scope._Index : 0;
        };

        $scope.showPhoto = function(index) {
            $scope._Index = index;
        };


        // User name handlers
        $scope.userNameClickHandler_1 = function() {
            $scope.userNameClick = false;
        };

        $scope.userNameClickHandler_2 = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.userNameClick = true;

                let userId = localStorage.getItem("userId");
                let obj = {
                    "firstname" : $scope.userName                    
                };
                accountRepository.editUserData(userId, obj).then(function(response) {
                    console.log(response);
                }, function(error) {});
            }
        };
        // __________________

        $scope.tripNameClickHandler_1 = function() {
            $scope.tripNameClick = false;
        };

        $scope.tripNameClickHandler_2 = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.tripNameClick = true;
            }
        };

        setTimeout(function() {
            var list1 = document.getElementById('plane-trip-list1');
            var sortableList1 = Sortable.create(list1, {
                group: 'plane-trip-group',
                animation: 300,
                onAdd: function (evt) {
                    $scope.sortedPlaceList.push($scope.unsortedPlacesList[evt.item.getAttribute("data-index")]);
                    $scope.$apply();
                }
            });

            var list2 = document.getElementById('plane-trip-list2');
            var sortableList2 = Sortable.create(list2, {
                group: 'plane-trip-group',
                animation: 300
            });
        }, 1000);

       	$scope.planeTrip = function() {
    		if ($scope.check == "" || $scope.check == "article") {
    			$scope.check = "trip";

               	return;
    		}
    		$scope.check = "";
    		return;
    	};

    	$scope.writeArticle = function() {
    		if ($scope.check == "" || $scope.check == "trip") {
    			$scope.check = "article";
    			return;
    		}
    		$scope.check = "";
    		return;
    	};

        $scope.sortedPlaceList = [
            
        ];

        $scope.unsortedPlacesList = [
            [{
                id: 1,
                latitude: 47, 
                longitude: 9,
                placeName: "aaaa"
            }],
            [{
                id: 2,
                latitude: 47.3, 
                longitude: 9.5,
                placeName: "bbbb"

            }],
            [{
                id: 3,
                latitude: 46.7, 
                longitude: 8.5,
                placeName: "cccc"
            }],
            [{
                id: 4,
                latitude: 46.3, 
                longitude: 9.2,
                placeName: "dddd"
            }],
            [{
                id: 5,
                latitude: 46.1, 
                longitude: 8.8,
                placeName: "eeee"
            }]
        ];

        $scope.map = { 
            center: { 
                latitude: 47, 
                longitude: 9
            }, 
            zoom: 8
        };

        $scope.bd = {
            northeast: {
                latitude: 51.219053,
                longitude: 4.404418
            },
            southwest: {
                latitude: -51.219053,
                longitude: -4.404418
            }
        };

        $scope.markers = [
            [{
                id: 4,
                latitude: 46.3, 
                longitude: 9.2,
                placeName: "dddd"
            }],
            [{
                id: 5,
                latitude: 46.1, 
                longitude: 8.8,
                placeName: "eeee"
            }]
        ];

        $scope.options = {
            scrollwheel: true
        };



    }]);

})()

