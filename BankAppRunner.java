import java.util.*;

public class BankAppRunner
{
    Scanner input = new Scanner(System.in);
    public static void main(String[] args)
    {
        Bank b1 = new Bank(1, "ABC Digital Bank");

        System.err.println(b1.getName());

        
    }


}



class Bank
{
    private int id;
    private String name;

    public Bank(int ID, String NAME)
    {
        id = ID;
        name = NAME;
    }

    public Bank(){}


    public void setId(int ID)
    {
        id = ID;
    }

    public int getId()
    {
        return id;
    }

    public void setName(String NAME)
    {
        name = NAME;
    }

    public String getName()
    {
        return name;
    }
}