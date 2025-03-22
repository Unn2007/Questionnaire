# Base Level

## Questionnaire Catalog Page  
Page where users can observe the paginated list of available questionnaires.  
Card should consist of:  
- **Questionnaire name**  
- **Description**  
- **Amount of questions**  
- **Amount of completions**  
- **Actions**:  
  - Edit (should open a page similar to the creation page)  
  - Run  
  - Delete  

## Questionnaire Builder Page  
Page where users can create a questionnaire by adding multiple questions.  
Possible question types:  
- **Text** – free-form user input  
- **Single choice** – user can select only one of the possible answers (radio buttons)  
- **Multiple choices** – user can select several answers (checkbox buttons)  

Once the questionnaire is submitted, it should be stored in a database.  

## Interactive Questionnaire Page  
Page where users can complete the questionnaire created earlier.  
At the end of the questionnaire, the user should see:  
- All his answers  
- The time it took to complete the questionnaire  

Once the questionnaire is completed, responses should be stored in the database.  
This page should be available by clicking on the **"Run"** action.  
