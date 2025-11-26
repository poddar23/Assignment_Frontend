// multi-Dimension array having 3 sizes
//syntax:  return-type arr_name [table][row][col];
#include<stdio.h>
int main(){
    int row,col,table;
    int arr[3][3][3]={ {
                        {1,2,3},
                        {4,5,6},
                        {7,8,9}
                    },
                    {
                        {7,8,9},
                        {9,6,3},
                        {8,52,4}
                    },
                    {
                        {77,55,33},
                        {44,99,11},
                        {22,25,35}
                    }
    };

    printf ("\nMulti-dimension array\n");
    for(table=0;table<3;table++){
        printf("\n");
        for(row=0;row<3;row++){
            printf("\n");
            for(col=0;col<3;col++){
                printf("%d ",arr[table][row][col]);
            }
        }
    }
}