// factorial
#include<stdio.h>
int main(){
    int num,i,fact=1;
    printf("Enter number:");
    scanf("%d",&num);
    for(i=1;i<=num;i++){
         fact=fact*i;
    }
    printf(" factorial=%d",fact);
}

