// relational operators
#include<stdio.h>
int main(){
    int num1,num2;
    printf("Enter numbers:");
    scanf("%d %d",&num1,&num2);
    
    printf("\n num1>num2 (Greater than):%d",num1>num2);
    printf("\n num1<num2 (less than):%d",num1<num2);
    printf("\n num1>num2 (Greater equal than):%d",num1>=num2);
    printf("\n num1>num2 (Less equal than):%d",num1<=num2);
    printf("\n not equal to:%d",num1!=num2);
    printf("\n Equal to=%d",num1==num2);
}