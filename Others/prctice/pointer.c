// pointer with array:
#include<stdio.h>
int main(){
    int arr[7]={74,85,96,41,52,63,25};
    int *ptr1,*ptr2;
    ptr1=&arr[0];
    ptr2=&arr[6];
    printf("\n Address at array 0 position=%d",ptr1);
    printf("\n Address at array 6 position=%d",ptr2);

    ptr1++;
       printf("\n Address at array 1 position=%d",ptr1);
    ptr2--;
       printf("\n Address at array 5 position=%d",ptr2);

    int res= *ptr1+*ptr2;
    printf("result=%d",res);
}