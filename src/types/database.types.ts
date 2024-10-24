export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export type Database = {
    public: {
        Tables: {
            cards: {
                Row: {
                    amount: number | null;
                    card_status: Database["public"]["Enums"]["card_status"] | null;
                    created_at: string;
                    id: string;
                    user_id: string | null;
                };
                Insert: {
                    amount?: number | null;
                    card_status?: Database["public"]["Enums"]["card_status"] | null;
                    created_at?: string;
                    id?: string;
                    user_id?: string | null;
                };
                Update: {
                    amount?: number | null;
                    card_status?: Database["public"]["Enums"]["card_status"] | null;
                    created_at?: string;
                    id?: string;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "cards_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            roles: {
                Row: {
                    created_at: string;
                    id: number;
                    role_name: Database["public"]["Enums"]["role"] | null;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    role_name?: Database["public"]["Enums"]["role"] | null;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    role_name?: Database["public"]["Enums"]["role"] | null;
                };
                Relationships: [];
            };
            users: {
                Row: {
                    auth_user_id: string | null;
                    cellphone: string | null;
                    created_at: string | null;
                    dni: string | null;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    last_name: string | null;
                    role_id: number | null;
                    street: string | null;
                };
                Insert: {
                    auth_user_id?: string | null;
                    cellphone?: string | null;
                    created_at?: string | null;
                    dni?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    role_id?: number | null;
                    street?: string | null;
                };
                Update: {
                    auth_user_id?: string | null;
                    cellphone?: string | null;
                    created_at?: string | null;
                    dni?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    role_id?: number | null;
                    street?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "users_role_id_fkey";
                        columns: ["role_id"];
                        isOneToOne: false;
                        referencedRelation: "roles";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            card_status: "active" | "inactive" | "lost";
            role: "admin" | "employee" | "customer";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | {schema: keyof Database},
    EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | {schema: keyof Database},
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {schema: keyof Database}
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
