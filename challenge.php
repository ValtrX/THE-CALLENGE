/*
1)
Please, fully explain this function: document iterations, conditionals, and the function objective as a whole
*/
<?php

function($p, $o, $ext) {

    $items = []; // Array to store product objects
    $sp = false; // 'Spe
    $cd = false;

    $ext_p = [];

    // Add data to $ext_p from the $ext or external data using the price id
    foreach ($ext as $i => $e) {
      $ext_p[$e['price']['id']] = $e['qty'];
    }

    // Iterate through $o or 'order' product or item and do multiple verifications 
    foreach ($o['items']['data'] as $i => $item) {
      
        //creates empty object of a product with an id
        $product = [
        'id': $item['id']
      ];

        //Verifies if the item price ID exists in the external data
        if isset($ext_p[$item['price']['id']]) {

            //Get the quantity associated with the price ID that is obtained from the external data 
            $qty = $ext_p[$item['price']['id']];

            //Verifies if the quantity less than 1 if so set the product as deleted
            if ($qty < 1) {
                $product['deleted'] = true;

            //Add the product to the cart if the quantity is more than 1
            } else {
                $product['qty'] = $qty;
            }

            //Remove the price ID from external data to avoid duplicate processing
            unset($ext_p[$item['price']['id']]);
        
        //Verifies if the ID of the actual product or item is the same that the id of the product that we are proccessing
        } else if ($item['price']['id'] == $p['id']) {
            //Set $sp or 'selected product' as true if the ID of the price is the same id of the product that we are proccessing
            $sp = true;

        //If there is no coincidence the current product is not related to either the main product or the external data.    
        } else {
            $product['deleted'] = true
            $cd = true
        }
      
    //The current product is added to the $items list. This represents a product that has been processed according to the above conditions      $items[] = $product;
    }
    
    //If $sp is false, the selected product is not in the cart in this case add the principal product to $items with the qty of 1
    if (!$sp) {
      $items[] = [
        'id': $p['id'],
        'qty': 1
      ];
    }
    
    //Check if the quantity of the rest external products is less than 1 if so that product is omitted
    foreach ($ext_p as $i => $details) {
      if ($details['qty'] < 1) {
          continue;
      }

      
    //If the quantity is greater than or equal to 1, that additional product is added to the $items list.
      $items[] = [
        'id': $details['price'],
        'qty': $details['qty']
      ];
    }
    
    //The function returns the complete list of products in the cart
    return $items;

//ANSWER:

//This Function would be used continuously to manage products in the cart in an online store as users add, modify or delete products, and could also incorporate external data, such as additional quantities, to accurately reflect the status of the shopping cart in all the time.





/* 
2) 
Write a class "LetterCounter" and implement a static method "CountLettersAsString" which receives a string parameter and returns a string that shows how many times each letter shows up in the string by using an asterisk (*).
Example: "Interview" -> "i:**,n:*,t:*,e:**,r:*,v:*,w:*"
*/

class LetterCounter {
    public static function CountLettersAsString($inputString) {

        $inputString = strtolower($inputString);
        $characterCounts = count_chars($inputString, 1);
        $result = '';

        // Iterate through the alphabet
        for ($i = ord('a'); $i <= ord('z'); $i++) {
            $letter = chr($i);

            if (isset($characterCounts[$i])) {
                $count = $characterCounts[$i];
            } else {
                $count = 0;
            }

            $result .= $letter . ':' . str_repeat('*', $count) . ',';
        }

        // Remove the trailing comma and return the result
        return rtrim($result, ',');
    }
}

// Example usage:
$inputString = "Cromosoma";
$result = LetterCounter::CountLettersAsString($inputString);
echo $result;

/*
3) 
Write a method that triggers a request to http://date.jsontest.com/, parses the json response and prints out the current date in a readable format as follows: Monday 14th of August, 2023 - 06:47 PM
*/

class DateFetcher {
  public static function getCurrentDate() {
      $jsonResponse = file_get_contents("http://date.jsontest.com");

      if ($jsonResponse === false) {
          return "Failed to retrieve data from the API.";
      }

      $data = json_decode($jsonResponse);

      if ($data === null) {
          return "Failed to parse JSON response.";
      }

      $date = DateTime::createFromFormat('U', $data->timestamp);
      $formattedDate = $date->format('l jS \of F, Y - h:i A');

      return $formattedDate;
  }
}

$currentDate = DateFetcher::getCurrentDate();
// Print the formatted date
echo $currentDate;

/*
4) Write a method that triggers a request to http://echo.jsontest.com/john/yes/tomas/no/belen/yes/peter/no/julie/no/gabriela/no/messi/no, parse the json response.
Using that data print two columns of data. The left column should contain the names of the persons that responses 'no',
and the right column should contain the names that responded 'yes'
*/

class JsonResponseHandler {
  public static function printNames() {

      $jsonResponse = file_get_contents("http://echo.jsontest.com/john/yes/tomas/no/belen/yes/peter/no/julie/no/gabriela/no/messi/no");

      if ($jsonResponse === false) {
          echo "Failed to retrieve data from the API.";
          return;
      }

      $data = json_decode($jsonResponse, true);

      if ($data === null) {
          echo "Failed to parse JSON response.";
          return;
      }

      // Initialize two arrays to hold names based on 'yes' and 'no' responses
      $yesNames = [];
      $noNames = [];

      foreach ($data as $name => $response) {
          if ($response === 'yes') {
              $yesNames[] = $name;
          } elseif ($response === 'no') {
              $noNames[] = $name;
          }
      }

      // Print the two columns of names
      echo "Names that responded 'yes':\n";
      foreach ($yesNames as $name) {
          echo $name . "\n";
      }

      echo "\nNames that responded 'no':\n";
      foreach ($noNames as $name) {
          echo $name . "\n";
      }
  }
}

// Call the method to print the names based on responses
JsonResponseHandler::printNames();