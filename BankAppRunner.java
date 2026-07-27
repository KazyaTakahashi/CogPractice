import java.util.*;

public class BankAppRunner
{
    static Scanner input = new Scanner(System.in);

    private static final Map<String, User> usersByUsername = new HashMap<>();

    public static void main(String[] args)
    {
        seed();

        System.out.println("Welcome to our bank");
        User loggedInUser = mylogin();

        if (loggedInUser.getAdminStatus())
        {
            //admin flow
            System.out.println("Welcome, " + loggedInUser.getUsername() + " to the admin dashboard");
            adminDashboard();
        }
        else
        {
            //customer flow
            System.out.println("Welcome, " + loggedInUser.getUsername() + " to the customer dashboard");
            customerDashboard((Customer) loggedInUser);
        }
    }

    private static void seed()
    {
        usersByUsername.clear();
        usersByUsername.put("admin", new Admin("admin", "admin123"));
        usersByUsername.put("rohit", new Customer("rohit", "rohit123", 1000, 5000));
        usersByUsername.put("mohit", new Customer("mohit", "mohit123", 1500, 7000));
        usersByUsername.put("shobhit", new Customer("shobhit", "shobhit123", 2000, 9000));
    }

    private static User mylogin()
    {
        //keep retrying login until successful or force exit
        while (true)
        {
            System.out.println("Please enter username and password separated by space");
            String usernamePassword = input.nextLine();
            //validation
            String[] tokens = usernamePassword.split(" ");
            if (tokens.length < 2)
            {
                System.out.println("An error has occurred, please try again.");
                continue;
            }

            String enteredUsername = tokens[0];
            String enteredPassword = tokens[1];
            User matchedUser = usersByUsername.get(enteredUsername);

            if (matchedUser != null && enteredPassword.equals(matchedUser.getPassword()))
            {
                return matchedUser;
            }

            System.out.println("An error has occurred, please try again.");
        }
    }

    private static void adminDashboard()
    {

    }

    private static void customerDashboard(Customer user)
    {
        while (true)
        {
            System.out.println("What would you like to do?");
            System.out.println("1: view account balances");
            System.out.println("2: withdraw from an account");
            System.out.println("3: deposit to an account");
            System.out.println("4: transfer between accounts");
            System.out.println("5: exit app\n");

            switch (input.nextLine())
            {
                case "1":
                    System.out.println("Checkings: $" + user.getCheckings().getBalance());
                    System.out.println("Savings: $" + user.getSavings().getBalance() + "\n");
                    break;

                case "2":
                    while (true)
                    {
                        System.out.println("Which account would you like to withdraw from?");
                        System.out.println("1: checkings");
                        System.out.println("2: savings");
                        System.out.println("3: exit\n");

                        String choice = input.nextLine();
                        
                        if (choice.equals("3"))
                        {
                            break;
                        }

                        if (!choice.equals("1") && !choice.equals("2"))
                        {
                            System.out.println("Please enter a valid number.\n");
                            continue;
                        }

                        System.out.println("How much would you like to withdraw?");
                        String amtStr = input.nextLine();
                        int amt;
                        try
                        {
                            amt = Integer.parseInt(amtStr);
                        }
                        catch (NumberFormatException e)
                        {
                            System.out.println("Invalid amount.\n");
                            continue;
                        }

                        if (amt <= 0)
                        {
                            System.out.println("Please enter a positive amount.\n");
                            continue;
                        }

                        if (choice.equals("1"))
                        {
                            if (amt > user.getCheckings().getBalance())
                            {
                                System.out.println("Insufficient funds.\n");
                                continue;
                            }
                            System.out.println("New checkings balance: $" + user.getCheckings().withdraw(amt) + "\n");
                        }
                        else
                        {
                            if (amt > user.getSavings().getBalance())
                            {
                                System.out.println("Insufficient funds.\n");
                                continue;
                            }
                            System.out.println("New savings balance: $" + user.getSavings().withdraw(amt) + "\n");
                        }

                        break;
                    }
                    break;

                case "3":
                    while (true)
                    {
                        System.out.println("Which account would you like to deposit to?");
                        System.out.println("1: checkings");
                        System.out.println("2: savings");
                        System.out.println("3: exit\n");

                        String choice = input.nextLine();

                        if (choice.equals("3"))
                        {
                            break;
                        }

                        if (!choice.equals("1") && !choice.equals("2"))
                        {
                            System.out.println("Please enter a valid number.\n");
                            continue;
                        }

                        System.out.println("How much would you like to deposit?");
                        String amtStr = input.nextLine();
                        int amt;
                        try
                        {
                            amt = Integer.parseInt(amtStr);
                        }
                        catch (NumberFormatException e)
                        {
                            System.out.println("Invalid amount.\n");
                            continue;
                        }

                        if (amt <= 0)
                        {
                            System.out.println("Please enter a positive amount.\n");
                            continue;
                        }

                        if (choice.equals("1"))
                        {
                            System.out.println("New checkings balance: $" + user.getCheckings().deposit(amt) + "\n");
                        }
                        else
                        {
                            System.out.println("New savings balance: $" + user.getSavings().deposit(amt) + "\n");
                        }

                        break;
                    }
                    break;

                case "4":
                    while (true)
                    {
                        System.out.println("How would you like to transfer funds?");
                        System.out.println("1: checkings to savings");
                        System.out.println("2: savings to checkings");
                        System.out.println("3: exit\n");

                        String choice = input.nextLine();
                        
                        if (choice.equals("3"))
                        {
                            break;
                        }

                        if (!choice.equals("1") && !choice.equals("2"))
                        {
                            System.out.println("Please enter a valid number.\n");
                            continue;
                        }

                        System.out.println("How much would you like to transfer?");
                        String amtStr = input.nextLine();
                        int amt;
                        try
                        {
                            amt = Integer.parseInt(amtStr);
                        }
                        catch (NumberFormatException e)
                        {
                            System.out.println("Invalid amount.\n");
                            continue;
                        }

                        if (amt <= 0)
                        {
                            System.out.println("Please enter a positive amount.\n");
                            continue;
                        }

                        if (choice.equals("1"))
                        {
                            if (amt > user.getCheckings().getBalance())
                            {
                                System.out.println("Insufficient funds in checkings.\n");
                                continue;
                            }
                            user.getCheckings().withdraw(amt);
                            user.getSavings().deposit(amt);
                        }
                        else
                        {
                            if (amt > user.getSavings().getBalance())
                            {
                                System.out.println("Insufficient funds in savings.\n");
                                continue;
                            }
                            user.getSavings().withdraw(amt);
                            user.getCheckings().deposit(amt);
                        }

                        System.out.println("Transfer complete.");
                        System.out.println("Checkings: $" + user.getCheckings().getBalance());
                        System.out.println("Savings: $" + user.getSavings().getBalance() + "\n");
                        break;
                    }
                    break;

                case "5":
                    System.out.println("Goodbye, " + user.getUsername() + "!\n");
                    return;

                default:
                    System.err.println("Please enter a valid number.\n");
                    break;
            }
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
        return password;
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
    private CheckingsAccount checkings;
    private SavingsAccount savings;

    public Customer(String USERNAME, String PASSWORD, int CHECKINGS, int SAVINGS)
    {
        username = USERNAME;
        password = PASSWORD;
        checkings = new CheckingsAccount(CHECKINGS);
        savings = new SavingsAccount(SAVINGS);
        isAdmin = false;
    }

    public CheckingsAccount getCheckings()
    {
        return checkings;
    }

    public SavingsAccount getSavings()
    {
        return savings;
    }
}


abstract class Account
{
    protected int balance;
    protected double interest;

    public int getBalance()
    {
        return balance;
    }

    public int deposit(int amount)
    {
        balance+=amount;
        return balance;
    }

    public int withdraw(int amount)
    {
        balance-=amount;
        return balance;
    }
}

class CheckingsAccount extends Account
{
    public CheckingsAccount(int BALANCE)
    {
        balance = BALANCE;
        interest = 0.01;
    }
}

class SavingsAccount extends Account
{
    public SavingsAccount(int BALANCE)
    {
        balance = BALANCE;
        interest = 0.02;
    }
}

//Interface AccountOperations: printInterestRate(), deposit, withdraw, transfer
//SavingsAccount always gives higher interest rate
