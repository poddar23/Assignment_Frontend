#include<stdio.h>
struct student{
    int rollno;
    float marks[4];
   float percent;
};
    int display(struct student s){
        printf("\n student details:\n");
        printf("\nRollno=%d",s.rollno);
        for(int i=0;i<4;i++){
            printf("\nMarks=%f",s.marks[i]);
        }
    }
int main(){
    struct student s1;  //  variable for structure
    float total=0;
    printf("Enter rollno:");
    scanf("%d",&s1.rollno);
    printf("Enter marks:");
    for(int i=0;i<4;i++){
        scanf("%f",&s1.marks[i]);
        total+=s1.marks[i];
    }
    display(s1);  // calling function
    printf("\npercent=%.2f",total/4);
}