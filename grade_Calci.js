var test_MaxValues = {};
var test_PercentageValues = {};
var finalGrade_ranges = {};

function add_default_values() {
    try{
        add_Test_MaximumValues(500, 500, 200, 100, 100, 100);
        add_Test_PercentageValues(10, 40, 20, 10, 10, 10);
        add_finalGrade_Ranges(90, 100, 80, 89, 70, 79, 60, 69, 0, 59);
        
        //further steps:
        // add each of these values to front end circular draggable
        //example
        //$('#element name').val();
    }
    catch(error) {
        console.log('error in add_default_values: ' + error);
    }
}

function get_TestMax_Values() {
    try{
    //further steps:
    //get individual element and set value to it from test_MaxValues 
    //$('#element name').val();
    }
    catch(error){
        console.log('error in get_TestMax_Values: ' + error);
    }
}

function update_TestMax_Values(){
    try{
    //further steps:
    //get individual element selected value and send as input parameter to below method
    //$('#element name').val();
    //add_Test_MaximumValues();
    }
    catch(error){
        console.log('error in update_TestMax_Values: ' + error);
    }
}

function add_Test_MaximumValues(homework_MaxVal, lab_MaxValue, project_MaxValue, presentation_MaxValue, midterm_MaxValue, final_MaxValue) {
    try {
        test_MaxValues['Homework_MaxValue'] = homework_MaxVal;
        test_MaxValues['Lab_MaxValue'] = lab_MaxValue;
        test_MaxValues['Project_MaxValue'] = project_MaxValue;
        test_MaxValues['Presentation_MaxValue'] = presentation_MaxValue;
        test_MaxValues['Midterm_MaxValue'] = midterm_MaxValue;
        test_MaxValues['Final_MaxValue'] = final_MaxValue;
        return true;
    }
    catch (error) {
        console.log('error in add_Test_MaximumValues: ' + error);
        return false;
    }
}

function get_TestPercentage_Values() {
    try{
    //further steps:
    //get individual element and set value to it from test_PercentageValues 
    //$('#element name').val();
    }
    catch(error){
        console.log('error in get_TestPercentage_Values: ' + error);
    }
}

function update_TestPercentage_Values() {
    try{
        //further steps:
        //get individual element selected value and send as input parameter to below method
        //$('#element name').val();
        //add_Test_PercentageValues(input parameters);
    }
    catch(error){
        console.log('error in update_TestPercentage_Values: ' + error);
    }
}

function add_Test_PercentageValues(homework_PercentageVal, lab_PercentageValue, project_PercentageValue, presentation_PercentageValue, midterm_PercentageValue, final_PercentageValue) {
    try {
        var returnVal = false;
        if (homework_PercentageVal + lab_PercentageValue + project_PercentageValue + presentation_PercentageValue + midterm_PercentageValue + final_PercentageValue == 100) {
            test_PercentageValues['Homework_PercentageVal'] = homework_PercentageVal;
            test_PercentageValues['Lab_PercentageValue'] = lab_PercentageValue;
            test_PercentageValues['Project_PercentageValue'] = project_PercentageValue;
            test_PercentageValues['Presentation_PercentageValue'] = presentation_PercentageValue;
            test_PercentageValues['Midterm_PercentageValue'] = midterm_PercentageValue;
            test_PercentageValues['Final_PercentageValue'] = final_PercentageValue;
            returnVal = true;
        }
        else {
            return "over all sum is not equal to 100";
        }
        return returnVal;
    }
    catch (error) {
        console.log('error in add_Test_PercentageValues: ' + error);
        return false;
    }


}

function get_final_GradeRange() {
    try{
    //further steps:
    //get individual element and set value to it from finalGrade_ranges 
    //$('#element name').val();
    }
    catch(error){
        console.log('error in get_final_GradeRange: ' + error);
    }
}

function update_final_GradeRange() {
    try{
        //further steps:
        //get individual element selected value and send as input parameter to below method
        //$('#element name').val();
        //add_finalGrade_Ranges(input parameters);
    }
    catch(error){
        console.log('error in update_final_GradeRange: ' + error);
    }
}

function add_finalGrade_Ranges(A_least, A_max, B_least, B_max, C_least, C_max, D_least, D_max, F_least, F_max) {
    try {
        finalGrade_ranges['A'] = { 'least': A_least, 'max': A_max };
        finalGrade_ranges['B'] = { 'least': B_least, 'max': B_max };
        finalGrade_ranges['C'] = { 'least': C_least, 'max': C_max };
        finalGrade_ranges['D'] = { 'least': D_least, 'max': D_max };
        finalGrade_ranges['F'] = { 'least': F_least, 'max': F_max };
        return true;
   }
   catch(error) {
       console.log('error in add_finalGrade_Ranges: ' + error);
       return false;
   }
}

function calculate_GPA(homework_value, lab_value, project_value, presentation_value, midterm_value, final_value) {
    //check if value entered is not either less than least Value and more than max value
    try{
        var return_Val = 'No Grade';

        var calulated_homeWork_value;
        var calulated_lab_value;
        var calulated_project_value;
        var calulated_presentation_value;
        var calulated_midterm_value;
        var calulated_final_value;

        if (homework_value >= 0 && homework_value <= test_MaxValues['Homework_MaxValue']) {
            //get homework percentage 
            calulated_homeWork_value = test_PercentageValues['Homework_PercentageVal'] * (homework_value / test_MaxValues['Homework_MaxValue']);
            calulated_homeWork_value = calulated_homeWork_value / 100;
        }
        else {
            //error in home work test result
            return 'error in homework value';
        }

        if (lab_value >= 0 && lab_value <= test_MaxValues['Lab_MaxValue']) {
            //get lab percentage 
            calulated_lab_value = test_PercentageValues['Lab_PercentageValue'] * (lab_value / test_MaxValues['Lab_MaxValue']);
            calulated_lab_value = calulated_lab_value / 100;
        }
        else {
            //error in lab test result
            return 'error in lab value';
        }
        if (project_value >= 0 && project_value <= test_MaxValues['Project_MaxValue']) {
            //get project percentage 
            calulated_project_value = test_PercentageValues['Project_PercentageValue'] * (project_value / test_MaxValues['Project_MaxValue']);
            calulated_project_value = calulated_project_value / 100;
        }
        else {
            //error in project test result
            return 'error in project value';
        }

        if (presentation_value >= 0 && presentation_value <= test_MaxValues['Presentation_MaxValue']) {
            //get persentation percentage 
            calulated_presentation_value = test_PercentageValues['Presentation_PercentageValue'] * (presentation_value / test_MaxValues['Presentation_MaxValue']);
            calulated_presentation_value = calulated_presentation_value / 100;
        }
        else {
            //error in persentation test result
            return 'error in presentation value';
        }

        if (midterm_value >= 0 && midterm_value <= test_MaxValues['Midterm_MaxValue']) {
            //get midterm percentage 
            calulated_midterm_value = test_PercentageValues['Midterm_PercentageValue'] * (midterm_value / test_MaxValues['Midterm_MaxValue']);
            calulated_midterm_value = calulated_midterm_value / 100;
        }
        else {
            //error in midterm test result
            return 'error in midterm value';
        }

        if (final_value >= 0 && final_value <= test_MaxValues['Final_MaxValue']) {
            //get final percentage 
            calulated_final_value = test_PercentageValues['Final_PercentageValue'] * (final_value / test_MaxValues['Final_MaxValue']);
            calulated_final_value = calulated_final_value / 100;
        }
        else {
            //error in final test result
            return 'error in final value';
        }

        //calculating final result
        var sumOf_allTests = calulated_homeWork_value + calulated_lab_value + calulated_project_value + calulated_presentation_value + calulated_midterm_value + calulated_final_value;

        console.log('sum ofall tests with weights: ' + sumOf_allTests);

        var final_Result = sumOf_allTests * 100;

        console.log('final Percentage: ' + final_Result);

        // looping through the finalGrade_ranges json -> comparing each grades range with fina_Result
        for (var key in finalGrade_ranges) {
            if (final_Result >= finalGrade_ranges[key]['least'] && final_Result <= finalGrade_ranges[key]['max']) {
                return_Val = key;
            }
            else {

            }
        }

        return return_Val;
    }
    catch(error){
        console.log('error in calculate_GPA: ' + error);
        return null;
    }
}


//Individual Element events (on click, on select etc..)