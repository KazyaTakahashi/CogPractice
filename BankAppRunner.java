import java.util.*;

public class BankAppRunner
{
    static Scanner sc = new Scanner(System.in);

    static Map<String, String> map = new HashMap<>();

    //seeding "database"
    static {
        map.put("admin","admin123");
        map.put("rohit","rohit123");
        map.put("mohit","mohit123");
        map.put("shobhit","shobhit123");
    }


    public static void main(String[] args)
    {
        System.out.println("Welcome to our bank");
        String loggedInUsername = mylogin();
        //authenticateUser(loggedInUsername);

        


    }

    private static String mylogin()
    {
        //keep retrying login until successful or force exit
        while (true)
        {
            System.out.println("Please enter username and password separated by space");
            String usernamePassword = sc.nextLine();
            //validation
            String[] tokens = usernamePassword.split(" ");
            String enteredUsername = tokens[0];
            String enteredPassword = tokens[1];

            for (Map.Entry<String, String> me:map.entrySet())
            {
                String username = me.getKey();
                String password = me.getValue();
                if (username.equals(enteredUsername) && password.equals(enteredPassword))
                {
                    return username;
                }
            }

            System.out.println("An error has occurred, please try again.");
        }
    }
}


class Bank
{
    private int id;
    private String name;

    public Bank(int id, String name)
    {
        this.id = id;
        this.name = name;
    }

    public Bank(){}

    public int getId()
    {
        return id;
    }

    public void setId(int ID)
    {
        id = ID;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String NAME)
    {
        name = NAME;
    }
}


abstract class User
{
    protected String username;
    protected String password;
    protected boolean isAdmin;

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String USERNAME)
    {
        username = USERNAME;
    }

    public String getPassword()
    {
        return username;
    }

    public void setPassword(String PASSWORD)
    {
        password = PASSWORD;
    }

    public boolean getAdminStatus()
    {
        return isAdmin;
    }
}

class Admin extends User
{
    public Admin(String USERNAME, String PASSWORD)
    {
        username = USERNAME;
        password = PASSWORD;
        isAdmin = true;
    }
}

class Customer extends User
{
    public Customer(String USERNAME, String PASSWORD)
    {
        username = USERNAME;
        password = PASSWORD;
        isAdmin = false;
    }
}


//Abstract Class Account
//CheckingsAccount extends Account
//SavingsAccount extends Account

//Interface AccountOperations: printInterestRate(), deposit, withdraw, transfer
//SavingsAccount always gives higher interest rate