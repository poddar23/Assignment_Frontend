// making calculator with function
#include<stdio.h>
int show(int a,char ch, int b, int res){
    printf("%d %c %d=%d",a,ch,b,res);
}
int sum(int a,int b){
    show(a,'+',b,a+b);
}
int sub(int a,int b){
    show(a,'-',b,a-b);
}
int multiply(int a,int b){
    show(a,'*',b,a*b);
}
int divide(int a,int b){
    show(a,'/',b,a/b);
}
int modulo(int a,int b){
    show(a,'%',b,a%b);
}


int main(){
    int choice;
    int a,b;
    do{
    printf("\n Enter numbers:");
    scanf("%d %d",&a,&b);
    printf("\n Enter your choice:");
    printf("\n 1. Addition");
    printf("\n 2. Subtraction");
    printf("\n 3. Multiplication");
    printf("\n 4. Division");
    printf("\n 5. Modulo");
    scanf("%d",&choice);
    switch (choice){
    case 1:
        printf("Addition\n ");
        sum(a,b);
        break;
    case 2:
        printf("Subtraction\n ");
        sub(a,b);
        break;
    case 3:
        printf("Multiplication\n ");
        multiply(a,b);
        break;
    case 4:
        printf("Division\n ");
        divide(a,b);
        break;
    case 5:
        printf("Modulo\n ");
        modulo(a,b);
        break;
    default:
        printf("Invalid choice");
        break;
    }
    }while(choice<=5);
}